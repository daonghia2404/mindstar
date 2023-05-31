import React from 'react';
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
  EUpdateClassAction,
  createClassAction,
  getBranchesAction,
  getManagersAction,
  updateClassAction,
} from '@/redux/actions';
import { showNotification, validationRules } from '@/utils/functions';
import { EFormat, ETypeNotification, EUserType } from '@/common/enums';
import TextArea from '@/components/TextArea';
import MultipleSelect from '@/components/MultipleSelect';
import { useOptionsPaginate } from '@/utils/hooks';
import WorkingTimes, { TWorkTime } from '@/components/WorkingTimes';

import { TModalShopProductsFormProps } from './ModalShopProductsForm.type';
import './ModalShopProductsForm.scss';

const ModalShopProducts: React.FC<TModalShopProductsFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {
    options: optionsManagers,
    handleLoadMore: handleLoadMoreManagers,
    handleSearch: handleSearchManagers,
  } = useOptionsPaginate(getManagersAction, 'managerReducer', 'getManagersResponse', undefined, {
    userType: EUserType.TEACHER,
  });

  const {
    options: optionsBranches,
    handleLoadMore: handleLoadMoreBranches,
    handleSearch: handleSearchBranches,
  } = useOptionsPaginate(getBranchesAction, 'branchReducer', 'getBranchesResponse', 'branchName');

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

  return (
    <Modal
      className="ModalShopProducts"
      title="Update Product"
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalShopProducts-wrapper">
        <Form form={form}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="name" rules={[validationRules.required()]}>
                <Input label="Product name" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Product code" rules={[validationRules.required()]}>
                <Input label="Product code" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="description">
                <TextArea label="Product description" placeholder="" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="membershipFee">
                <Input
                  label="Selling price"
                  placeholder="Nhập dữ liệu"
                  active
                  numberic
                  useNumber
                  useComma
                  suffixText="đ"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="membershipFee">
                <Input
                  label="Retail price"
                  placeholder="Nhập dữ liệu"
                  active
                  numberic
                  useNumber
                  useComma
                  suffixText="đ"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="category" rules={[validationRules.required()]}>
                <MultipleSelect
                  label="Category"
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
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalShopProducts;
