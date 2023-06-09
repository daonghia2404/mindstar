import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import { TRootState } from '@/redux/reducers';
import {
  ECreateExpenseAction,
  EGetBranchesAction,
  EGetCategoriesAction,
  EGetManagersAction,
  EGetPlayersAction,
  EUpdateExpenseAction,
  createExpenseAction,
  getBranchesAction,
  getCategoriesAction,
  getManagersAction,
  getPlayersAction,
  updateExpenseAction,
} from '@/redux/actions';
import { showNotification, validationRules } from '@/utils/functions';
import { EAuditingStatus, ETypeCategory, ETypeNotification } from '@/common/enums';
import TextArea from '@/components/TextArea';
import DatePicker from '@/components/DatePicker';
import { useOptionsPaginate } from '@/utils/hooks';
import Select from '@/components/Select';
import { dataPaymentTypeOptions } from '@/common/constants';

import { TModalExpenseFormProps } from './ModalExpenseForm.type';
import './ModalExpenseForm.scss';

const ModalExpenseForm: React.FC<TModalExpenseFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});
  const currentBranch = useSelector((state: TRootState) => state.uiReducer.branch);

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
  );

  const {
    options: optionsCategories,
    handleLoadMore: handleLoadMoreCategories,
    handleSearch: handleSearchCategories,
    handleReset: handleResetCategories,
  } = useOptionsPaginate(
    getCategoriesAction,
    'categoryReducer',
    'getCategoriesResponse',
    EGetCategoriesAction.GET_CATEGORIES,
    undefined,
    {
      type: ETypeCategory.EXPENSE,
    },
  );

  const {
    options: optionsPlayers,
    handleLoadMore: handleLoadMorePlayers,
    handleSearch: handleSearchPlayers,
    handleReset: handleResetPlayers,
  } = useOptionsPaginate(
    getPlayersAction,
    'playerReducer',
    'getPlayersResponse',
    EGetPlayersAction.GET_PLAYERS,
    undefined,
    {
      auditingStatuses: EAuditingStatus.ACTIVE,
    },
    { branchIds: formValues?.branch?.value || '' },
  );

  const {
    options: optionsManagers,
    handleLoadMore: handleLoadMoreManagers,
    handleSearch: handleSearchManagers,
    handleReset: handleResetManagers,
  } = useOptionsPaginate(
    getManagersAction,
    'managerReducer',
    'getManagersResponse',
    EGetManagersAction.GET_MANAGERS,
    undefined,
    {
      auditingStatuses: EAuditingStatus.ACTIVE,
    },
    { branchIds: formValues?.branch?.value || '' },
  );

  const createExpenseLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreateExpenseAction.CREATE_EXPENSE],
  );
  const updateExpenseLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateExpenseAction.UPDATE_EXPENSE],
  );
  const loading = createExpenseLoading || updateExpenseLoading;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        branch_id: values?.branch ? Number(values?.branch?.value) : undefined,
        amount: values?.amount,
        manager_id: values?.manager ? Number(values?.manager?.value) : undefined,
        player_id: values?.player ? Number(values?.player?.value) : undefined,
        at_date: values?.atDate?.valueOf(),
        category_id: values?.expenseType ? Number(values?.expenseType?.value) : undefined,
        note: values?.note,
        payment_type: values?.paymentType?.value,
      };

      if (data) {
        dispatch(updateExpenseAction.request({ body, paths: { id: data?.id } }, handleSubmitSuccess));
      } else {
        dispatch(createExpenseAction.request({ body }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Hoá đơn Chi Phí Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      handleResetCategories();

      if (data) {
        const dataChanged = {
          branch: data?.branch ? { label: data?.branch?.name, value: String(data?.branch?.id) } : undefined,
          amount: data?.amount,
          manager: data?.receiver ? { label: data?.receiver?.name, value: String(data?.receiver?.id) } : undefined,
          player: data?.receiver ? { label: data?.receiver?.name, value: String(data?.receiver?.id) } : undefined,
          atDate: data?.at_date ? moment(data.at_date) : undefined,
          expenseType: data?.category
            ? { label: data?.category?.name, value: String(data?.category?.id), data: data?.category }
            : undefined,
          note: data?.note,
          paymentType: dataPaymentTypeOptions.find((item) => item.value === data?.payment_type),
        };
        form.setFieldsValue(dataChanged);
        setFormValues({ ...formValues, ...dataChanged });
      } else {
        const dataChanged = {
          branch: currentBranch?.id ? { label: currentBranch?.name, value: String(currentBranch?.id) } : undefined,
        };
        form.setFieldsValue(dataChanged);
        setFormValues({ ...formValues, ...dataChanged });
      }
    } else {
      form.resetFields();
      setFormValues({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form, data]);

  useEffect(() => {
    if (formValues?.branch) {
      handleResetPlayers();
      handleResetManagers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues.branch]);

  return (
    <Modal
      className="ModalExpenseForm"
      title={data ? 'Sửa Chi Phí' : 'Tạo mới Chi Phí'}
      visible={visible}
      onClose={onClose}
      width={540}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalExpenseForm-wrapper">
        <Form form={form} onValuesChange={(value, values): void => setFormValues({ ...formValues, ...values })}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="expenseType" rules={[validationRules.required()]}>
                <Select
                  label="Loại chi phí"
                  placeholder="Chọn dữ liệu"
                  required
                  active
                  disabled={Boolean(data)}
                  showSearch
                  options={optionsCategories}
                  onSearch={handleSearchCategories}
                  onLoadMore={handleLoadMoreCategories}
                />
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
                  disabled={Boolean(data)}
                  options={optionsBranches}
                  onLoadMore={handleLoadMoreBranches}
                  onSearch={handleSearchBranches}
                  onChange={(option): void => {
                    const dataChanged = {
                      branch: option,
                      manager: undefined,
                      player: undefined,
                    };

                    setFormValues({ ...formValues, ...dataChanged });
                    form.setFieldsValue(dataChanged);
                  }}
                />
              </Form.Item>
            </Col>
            {formValues?.branch && formValues?.expenseType?.data?.id === 1 && (
              <Col span={24}>
                <Form.Item name="player" rules={[validationRules.required()]}>
                  <Select
                    label="Học viên"
                    placeholder="Chọn dữ liệu"
                    required
                    active
                    showSearch
                    disabled={Boolean(data)}
                    options={optionsPlayers}
                    onLoadMore={handleLoadMorePlayers}
                    onSearch={handleSearchPlayers}
                  />
                </Form.Item>
              </Col>
            )}

            {formValues?.branch && formValues?.expenseType?.data?.id === 2 && (
              <Col span={24}>
                <Form.Item name="manager" rules={[validationRules.required()]}>
                  <Select
                    label="Giáo viên"
                    placeholder="Chọn dữ liệu"
                    required
                    active
                    showSearch
                    disabled={Boolean(data)}
                    options={optionsManagers}
                    onLoadMore={handleLoadMoreManagers}
                    onSearch={handleSearchManagers}
                  />
                </Form.Item>
              </Col>
            )}

            <Col span={24}>
              <Form.Item name="atDate" rules={[validationRules.required()]}>
                <DatePicker label="Ngày tạo" required placeholder="Chọn dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="amount" rules={[validationRules.required()]}>
                <Input
                  label="Giá trị"
                  required
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
              <Form.Item name="paymentType" rules={[validationRules.required()]}>
                <Select
                  label="Loại thanh toán"
                  placeholder="Chọn dữ liệu"
                  required
                  active
                  options={dataPaymentTypeOptions}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="note">
                <TextArea label="Ghi chú" placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalExpenseForm;
