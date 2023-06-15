import React, { useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Select, { TSelectOption } from '@/components/Select';
import { TRootState } from '@/redux/reducers';
import {
  ECreateClassAction,
  EGetBranchesAction,
  EGetManagersAction,
  EUpdateClassAction,
  createClassAction,
  getBranchesAction,
  getManagersAction,
  updateClassAction,
} from '@/redux/actions';
import { formatISODateToDateTime, showNotification, validationRules } from '@/utils/functions';
import { EAuditingStatus, EFormat, ETypeNotification, EUserType } from '@/common/enums';
import TextArea from '@/components/TextArea';
import MultipleSelect from '@/components/MultipleSelect';
import { useOptionsPaginate } from '@/utils/hooks';
import WorkingTimes, { TWorkTime } from '@/components/WorkingTimes';
import { dataWorkingTimesDefault } from '@/components/WorkingTimes/WorkingTimes.data';
import Switch from '@/components/Switch';

import { TModalClassFormProps } from './ModalClassForm.type';
import './ModalClassForm.scss';

const ModalClassForm: React.FC<TModalClassFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const currentBranch = useSelector((state: TRootState) => state.uiReducer.branch);

  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data;

  const {
    options: optionsManagers,
    handleLoadMore: handleLoadMoreManagers,
    handleSearch: handleSearchManagers,
  } = useOptionsPaginate(
    getManagersAction,
    'managerReducer',
    'getManagersResponse',
    EGetManagersAction.GET_MANAGERS,
    undefined,
    {
      userType: EUserType.TEACHER,
    },
    undefined,
    visible,
  );

  const {
    options: optionsBranches,
    handleLoadMore: handleLoadMoreBranches,
    handleSearch: handleSearchBranches,
  } = useOptionsPaginate(
    getBranchesAction,
    'branchReducer',
    'getBranchesResponse',
    EGetBranchesAction.GET_BRANCHES,
    'branchName',
    undefined,
    undefined,
    visible,
  );

  const createClassLoading = useSelector((state: TRootState) => state.loadingReducer[ECreateClassAction.CREATE_CLASS]);
  const updateClassLoading = useSelector((state: TRootState) => state.loadingReducer[EUpdateClassAction.UPDATE_CLASS]);
  const loading = createClassLoading || updateClassLoading;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const parseScheduleGroup: { [key: number]: any } = _.groupBy(
        values?.schedules?.map((item: TWorkTime) => {
          const startTime = moment(item.startTime, EFormat['HH:mm:ss']).valueOf();
          const endTime = moment(item.endTime, EFormat['HH:mm:ss']).valueOf();

          return {
            ...item,
            at_time: startTime,
            duration_in_second: (endTime - startTime) / 1000,
            totalTime: startTime + endTime,
          };
        }) || [],
        'totalTime',
      );

      const parseScheduleData = Object.keys(parseScheduleGroup)
        ?.map((item) => {
          const firstItem = parseScheduleGroup?.[item as unknown as number]?.[0];
          const mergeDayOfWeek = _.uniq(
            parseScheduleGroup?.[item as unknown as number]?.map((subItem: TWorkTime) => subItem?.dayOfWeek),
          )?.join(',');

          return {
            at_eras: mergeDayOfWeek,
            at_time: firstItem?.at_time,
            duration_in_second: firstItem?.duration_in_second,
          };
        })
        .flat();

      const parseScheduleManagerId = values?.managers
        ?.map((item: TSelectOption) => {
          return parseScheduleData?.map((subItem) => ({
            manager_id: Number(item.value),
            ...subItem,
          }));
        })
        ?.flat();

      const body = {
        branch_id: values?.branch ? Number(values?.branch?.value) : undefined,
        name: values?.name,
        description: values?.description || '',
        course_fee: values?.membershipFee,
        schedules: parseScheduleManagerId,
        auditing_status: !data || values?.status ? EAuditingStatus.ACTIVE : EAuditingStatus.INACTIVE,
      };

      if (data) {
        dispatch(updateClassAction.request({ body, paths: { id: data?.id } }, handleSubmitSuccess));
      } else {
        dispatch(createClassAction.request({ body }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Lớp Học Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      if (data) {
        form.setFieldsValue({
          branch: data?.branch ? { label: data?.branch?.name, value: String(data?.branch?.id) } : undefined,
          name: data?.name,
          description: data?.description,
          schedules: data?.schedules
            ?.map((item) => {
              const parseDayOfWeek = item.at_eras.split(',')?.filter((subItem) => subItem);
              return parseDayOfWeek.map((subItem) => ({
                ...item,
                dayOfWeek: subItem,
              }));
            })
            .flat()
            .map((item) => {
              return {
                dayOfWeek: item.dayOfWeek,
                startTime: formatISODateToDateTime(item.at_time, EFormat['HH:mm:ss']),
                endTime: formatISODateToDateTime(item.at_time + item.duration_in_second * 1000, EFormat['HH:mm:ss']),
              };
            }),
          membershipFee: data?.course_fee,
          managers: data?.managers?.map((item) => ({ label: item.name, value: String(item.id) })),
          status: Boolean(data?.auditing_status),
        });
      } else {
        form.setFieldsValue({
          branch: currentBranch?.id ? { label: currentBranch?.name, value: String(currentBranch?.id) } : undefined,
          membershipFee: settingsState?.transaction_settings?.fee_transaction_value,
          schedules: dataWorkingTimesDefault,
        });
      }
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form, data]);

  return (
    <Modal
      className="ModalClassForm"
      title={data ? 'Sửa Lớp Học' : 'Tạo mới Lớp Học'}
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalClassForm-wrapper">
        <Form form={form}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="name" rules={[validationRules.required()]}>
                <Input label="Tên" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="branch" rules={[validationRules.required()]}>
                <Select
                  label="Chi nhánh"
                  placeholder="Chọn dữ liệu"
                  required
                  active
                  showSearch
                  options={optionsBranches}
                  onLoadMore={handleLoadMoreBranches}
                  onSearch={handleSearchBranches}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="managers" rules={[validationRules.required()]}>
                <MultipleSelect
                  label="Giáo Viên"
                  placeholder="Chọn dữ liệu"
                  required
                  active
                  showSearch
                  useAvatarOption
                  options={optionsManagers}
                  onLoadMore={handleLoadMoreManagers}
                  onSearch={handleSearchManagers}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="schedules" rules={[validationRules.required()]}>
                <WorkingTimes label="Lịch học" required />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="membershipFee">
                <Input label="Học phí" placeholder="Nhập dữ liệu" active numberic useNumber useComma suffixText="đ" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="description">
                <TextArea label="Mô tả" placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            {data && (
              <Col span={24}>
                <Form.Item name="status">
                  <Switch label="Trạng thái" />
                </Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalClassForm;
