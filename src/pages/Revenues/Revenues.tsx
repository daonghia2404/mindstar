import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment, { Moment } from 'moment';
import { Link } from '@reach/router';

import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  dataPaymentTypeOptions,
  dataTransactionTypeOptions,
} from '@/common/constants';
import { EEmpty, EFormat, EPaymentType, ETransactionType } from '@/common/enums';
import { TTransaction } from '@/common/models';
import Button, { EButtonStyleType } from '@/components/Button';
import Card from '@/components/Card';
import DropdownMenu from '@/components/DropdownMenu';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import Table from '@/components/Table';
import { EGetTransactionsAction, getTransactionsAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { TGetTransactionsParams } from '@/services/api';
import { formatCurrency, formatISODateToDateTime } from '@/utils/functions';
import ModalDeleteRevenue from '@/pages/Revenues/ModalDeleteRevenue';
import ModalRevenueForm from '@/pages/Revenues/ModalRevenueForm';
import Select from '@/components/Select';
import DatePicker from '@/components/DatePicker';
import Tags from '@/components/Tags';
import { Paths } from '@/pages/routers';

import './Revenues.scss';

const Revenues: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getTransactionsLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetTransactionsAction.GET_TRANSACTIONS],
  );
  const transactionsState = useSelector((state: TRootState) => state.transactionReducer.getTransactionsResponse)?.data;
  const [modalRewardFormState, setModalRevenueFormState] = useState<{ visible: boolean; data?: TTransaction }>({
    visible: false,
  });
  const [modalDeleteRewardState, setModalDeleteRevenueState] = useState<{ visible: boolean; data?: TTransaction }>({
    visible: false,
  });

  const [getTransactionsParamsRequest, setGetTransactionsParamsRequest] = useState<TGetTransactionsParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    fromDate: moment().startOf('month')?.valueOf(),
    toDate: moment().endOf('month')?.valueOf(),
  });

  const handleOpenModalRevenueForm = (data?: TTransaction): void => {
    setModalRevenueFormState({ visible: true, data });
  };

  const handleCloseModalRevenueForm = (): void => {
    setModalRevenueFormState({ visible: false });
  };

  const handleOpenModalDeleteRevenue = (data?: TTransaction): void => {
    setModalDeleteRevenueState({ visible: true, data });
  };

  const handleCloseModalDeleteRevenue = (): void => {
    setModalDeleteRevenueState({ visible: false });
  };

  const handleSearch = (keyword?: string): void => {
    setGetTransactionsParamsRequest({
      ...getTransactionsParamsRequest,
      page: DEFAULT_PAGE,
      name: keyword,
    });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetTransactionsParamsRequest({
      ...getTransactionsParamsRequest,
      page,
      size,
      sort,
    });
  };

  const dataTableDropdownActions = (data?: TTransaction): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalRevenueForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteRevenue(data);
      },
    },
  ];

  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Đối tượng',
      sorter: true,
      keySort: 'buyer_name',
      className: 'limit-width',
      render: (_: string, record: TTransaction): React.ReactElement => {
        return (
          <div className="Table-info">
            {record?.buyer?.id ? (
              <Link to={Paths.PlayerDetail(String(record?.buyer?.id))} className="Table-info-title">
                {record?.buyer?.name || EEmpty.DASH}
              </Link>
            ) : (
              <div className="Table-info-title">{record?.buyer?.name || EEmpty.DASH}</div>
            )}
            {record?.title && <div className="Table-info-title">{record?.title || EEmpty.DASH}</div>}
            {!record.title && <div className="Table-info-description">{record?.buyer_class?.name || EEmpty.DASH}</div>}
          </div>
        );
      },
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      title: 'Tổng giá trị',
      className: 'nowrap',
      sorter: true,
      keySort: 'amount',
      render: (_: string, record: TTransaction): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title" style={{ color: EIconColor.APPLE }}>
              + {formatCurrency({ amount: record.amount || EEmpty.ZERO, showSuffix: true })}
            </div>
            <div className="Table-info-description">
              {dataPaymentTypeOptions.find((item) => item.value === record?.payment_type)?.label || EEmpty.DASH}
            </div>
          </div>
        );
      },
    },
    {
      key: 'atDate',
      dataIndex: 'atDate',
      title: 'Ngày tạo',
      sorter: true,
      keySort: 'at_date',
      className: 'nowrap',
      render: (_: string, record: TTransaction): string =>
        record.at_date ? formatISODateToDateTime(record.at_date, EFormat['DD/MM/YYYY - HH:mm']) : EEmpty.DASH,
    },
    {
      key: 'type',
      dataIndex: 'type',
      title: 'Loại',
      className: 'nowrap',
      sorter: true,
      keySort: 'transaction_detail_type',
      render: (_: string, record: TTransaction): string => {
        const currentRevenue = dataTransactionTypeOptions.find((item) => item.value === record.transaction_detail_type);
        return currentRevenue ? currentRevenue.label : EEmpty.DASH;
      },
    },
    {
      key: 'branch',
      dataIndex: 'branch',
      title: 'Chi nhánh',
      render: (_: string, record: TTransaction): React.ReactElement => {
        return (
          <Tags
            options={[
              {
                label: record?.branch?.name,
                value: String(record?.branch?.id),
                data: { iconName: EIconName.MapMarker },
              },
            ]}
          />
        );
      },
    },
    {
      key: 'short_description',
      dataIndex: 'short_description',
      title: 'Ghi chú',
      className: 'limit-width',
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TTransaction): React.ReactElement => (
        <div onClick={(e): void => e.stopPropagation()}>
          <DropdownMenu placement="bottomRight" options={dataTableDropdownActions(record)}>
            <Button
              iconName={EIconName.DotsVertical}
              iconColor={EIconColor.BLACK}
              size="small"
              styleType={EButtonStyleType.GENERAL_FORM}
            />
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const getTransactions = useCallback(() => {
    if (getTransactionsParamsRequest.fromDate && getTransactionsParamsRequest.toDate) {
      dispatch(
        getTransactionsAction.request({
          params: getTransactionsParamsRequest,
          headers: { branchIds: currentBranchId },
        }),
      );
    }
  }, [dispatch, getTransactionsParamsRequest, currentBranchId]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <div className="Revenues">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Revenues-filter">
            <Row gutter={[16, 16]} justify="space-between">
              <Col>
                <Row gutter={[16, 16]}>
                  <Col>
                    <Input
                      style={{ minWidth: '24rem' }}
                      label="Tìm kiếm"
                      suffixIcon={<Icon name={EIconName.Search} color={EIconColor.TUNDORA} />}
                      onSearch={handleSearch}
                    />
                  </Col>
                  <Col>
                    <Select
                      label="Loại doanh thu"
                      placeholder="Chọn dữ liệu"
                      value={dataTransactionTypeOptions.find(
                        (item) =>
                          item.value ===
                          Number(getTransactionsParamsRequest.transactionDetailType as unknown as ETransactionType),
                      )}
                      options={dataTransactionTypeOptions}
                      allowClear
                      onChange={(option): void => {
                        setGetTransactionsParamsRequest({
                          ...getTransactionsParamsRequest,
                          page: DEFAULT_PAGE,
                          transactionDetailType: option?.value,
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <Select
                      label="Loại thanh toán"
                      placeholder="Chọn dữ liệu"
                      value={dataPaymentTypeOptions.find(
                        (item) =>
                          item.value === Number(getTransactionsParamsRequest.paymentTypes as unknown as EPaymentType),
                      )}
                      options={dataPaymentTypeOptions}
                      allowClear
                      onChange={(option): void => {
                        setGetTransactionsParamsRequest({
                          ...getTransactionsParamsRequest,
                          page: DEFAULT_PAGE,
                          paymentTypes: option?.value,
                        });
                      }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row gutter={[16, 16]}>
                  <Col>
                    <DatePicker
                      value={moment(getTransactionsParamsRequest.fromDate)}
                      label="Tháng"
                      picker="month"
                      format={EFormat['MM/YYYY']}
                      placeholder=" "
                      onChange={(data: Moment): void => {
                        setGetTransactionsParamsRequest({
                          ...getTransactionsParamsRequest,
                          page: DEFAULT_PAGE,
                          fromDate: data?.clone()?.startOf('month')?.valueOf(),
                          toDate: data?.clone()?.endOf('month')?.valueOf(),
                        });
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Revenues-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <Row gutter={[16, 16]}>
                      <Col>
                        <div className="Table-total-item">
                          <Icon name={EIconName.Receipt} color={EIconColor.TUNDORA} />
                          Tổng Hoá Đơn: <strong>{transactionsState?.total_elements || EEmpty.ZERO}</strong>
                        </div>
                      </Col>
                      <Col>
                        <div className="Table-total-item">
                          <Icon name={EIconName.PigMoney} color={EIconColor.TUNDORA} />
                          Tổng Doanh Thu:{' '}
                          <strong>
                            {formatCurrency({ amount: transactionsState?.sub_total || EEmpty.ZERO, showSuffix: true })}
                          </strong>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Button
                      title="Tạo mới Doanh Thu"
                      styleType={EButtonStyleType.PURPLE}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                      onClick={handleOpenModalRevenueForm}
                    />
                  </Col>
                </Row>
              }
              loading={getTransactionsLoading}
              columns={columns}
              dataSources={transactionsState?.content || []}
              page={getTransactionsParamsRequest?.page}
              pageSize={getTransactionsParamsRequest?.size}
              total={transactionsState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>

      <ModalRevenueForm {...modalRewardFormState} onClose={handleCloseModalRevenueForm} onSuccess={getTransactions} />
      <ModalDeleteRevenue
        {...modalDeleteRewardState}
        onClose={handleCloseModalDeleteRevenue}
        onSuccess={getTransactions}
      />
    </div>
  );
};

export default Revenues;
