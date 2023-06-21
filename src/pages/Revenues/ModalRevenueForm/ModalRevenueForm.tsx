import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import { TRootState } from '@/redux/reducers';
import {
  ECreateTransactionAction,
  EGetBranchesAction,
  EGetPlayersAction,
  EUpdateTransactionAction,
  createTransactionAction,
  getBranchesAction,
  getPlayersAction,
  updateTransactionAction,
} from '@/redux/actions';
import { showNotification, validationRules } from '@/utils/functions';
import { EAuditingStatus, ETransactionStatus, ETransactionType, ETypeNotification } from '@/common/enums';
import TextArea from '@/components/TextArea';
import DatePicker from '@/components/DatePicker';
import { useOptionsPaginate } from '@/utils/hooks';
import Select from '@/components/Select';
import { dataPaymentTypeOptions, dataTransactionStatusOptions, dataTransactionTypeOptions } from '@/common/constants';

import { TModalRevenueFormProps } from './ModalRevenueForm.type';
import './ModalRevenueForm.scss';

const ModalRevenueForm: React.FC<TModalRevenueFormProps> = ({ visible, data, onClose, onSuccess }) => {
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
    undefined,
    undefined,
    visible,
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
    visible,
  );

  const createTransactionLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreateTransactionAction.CREATE_TRANSACTION],
  );
  const updateTransactionLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateTransactionAction.UPDATE_TRANSACTION],
  );
  const loading = createTransactionLoading || updateTransactionLoading;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        amount: values?.amount,
        player_id: values?.player ? Number(values?.player?.value) : undefined,
        at_date: values?.atDate?.valueOf(),
        branch_id: values?.branch?.value,
        payment_type: values?.paymentType?.value,
        short_description: values?.description,
        title: values?.title,
        transaction_detail_type: values?.transactionType?.value,
        transaction_status: values?.transactionStatus?.value,
      };

      if (data) {
        dispatch(updateTransactionAction.request({ body, paths: { id: data?.id } }, handleSubmitSuccess));
      } else {
        dispatch(createTransactionAction.request({ body }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Hoá đơn Doanh Thu Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      if (data) {
        const dataChanged = {
          amount: data?.amount,
          player: data?.buyer ? { label: data?.buyer?.name, value: String(data?.buyer?.id) } : undefined,
          atDate: data?.at_date ? moment(data.at_date) : undefined,
          branch: data?.branch ? { label: data?.branch?.name, value: String(data?.branch?.id) } : undefined,
          paymentType: dataPaymentTypeOptions.find((item) => item.value === data?.payment_type),
          description: data?.short_description,
          title: data?.title,
          transactionType: dataTransactionTypeOptions.find((item) => item.value === data?.transaction_detail_type),
          transactionStatus: dataTransactionStatusOptions.find((item) => item.value === data?.transaction_status),
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues.branch]);

  return (
    <Modal
      className="ModalRevenueForm"
      title={data ? 'Sửa Doanh Thu' : 'Tạo mới Doanh Thu'}
      visible={visible}
      onClose={onClose}
      width={540}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalRevenueForm-wrapper">
        <Form form={form} onValuesChange={(value, values): void => setFormValues({ ...formValues, ...values })}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="transactionType" rules={[validationRules.required()]}>
                <Select
                  label="Loại doanh thu"
                  placeholder="Chọn dữ liệu"
                  required
                  active
                  disabled={Boolean(data)}
                  options={dataTransactionTypeOptions.filter(
                    (item) => ![ETransactionType.PRODUCT, ETransactionType.MEMBERSHIP_FEE].includes(item.value),
                  )}
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
                      player: undefined,
                    };

                    setFormValues({ ...formValues, ...dataChanged });
                    form.setFieldsValue(dataChanged);
                  }}
                />
              </Form.Item>
            </Col>
            {formValues?.transactionType && (
              <>
                {[
                  ETransactionType.SPONSORSHIP,
                  ETransactionType.GIFT_AND_CONTRIBUTIONS,
                  ETransactionType.OTHER_SALES_AND_SERVICES,
                  // ETransactionType.TOURNAMENT,
                ].includes(formValues?.transactionType?.value) ? (
                  <Col span={24}>
                    <Form.Item name="title" rules={[validationRules.required()]}>
                      <Input label="Tiêu đề" required placeholder="Nhập dữ liệu" active />
                    </Form.Item>
                  </Col>
                ) : (
                  <>
                    {formValues?.branch && (
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
                  </>
                )}
              </>
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
              <Form.Item name="transactionStatus" rules={[validationRules.required()]}>
                <Select
                  label="Trạng thái"
                  placeholder="Chọn dữ liệu"
                  required
                  active
                  disabled={Boolean(data)}
                  options={dataTransactionStatusOptions.filter((item) =>
                    [ETransactionStatus.NEW, ETransactionStatus.PAID].includes(item.value),
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="description">
                <TextArea label="Ghi chú" placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalRevenueForm;
