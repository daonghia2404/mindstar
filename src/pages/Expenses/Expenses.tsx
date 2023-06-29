import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment, { Moment } from 'moment';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataPaymentTypeOptions } from '@/common/constants';
import { EEmpty, EFormat, EPaymentType, ETypeCategory } from '@/common/enums';
import { TExpense } from '@/common/models';
import Button, { EButtonStyleType } from '@/components/Button';
import Card from '@/components/Card';
import DropdownMenu from '@/components/DropdownMenu';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import Table from '@/components/Table';
import { EGetCategoriesAction, EGetExpensesAction, getCategoriesAction, getExpensesAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { TGetExpensesParams } from '@/services/api';
import { formatCurrency, formatISODateToDateTime } from '@/utils/functions';
import ModalDeleteExpense from '@/pages/Expenses/ModalDeleteExpense';
import ModalExpenseForm from '@/pages/Expenses/ModalExpenseForm';
import Select from '@/components/Select';
import DatePicker from '@/components/DatePicker';
import Tags from '@/components/Tags';
import { useOptionsPaginate } from '@/utils/hooks';

import './Expenses.scss';

const Expenses: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getExpensesLoading = useSelector((state: TRootState) => state.loadingReducer[EGetExpensesAction.GET_EXPENSES]);
  const expensesState = useSelector((state: TRootState) => state.expenseReducer.getExpensesResponse)?.data;
  const [modalExpenseFormState, setModalExpenseFormState] = useState<{ visible: boolean; data?: TExpense }>({
    visible: false,
  });
  const [modalDeleteExpenseState, setModalDeleteExpenseState] = useState<{ visible: boolean; data?: TExpense }>({
    visible: false,
  });

  const [getExpensesParamsRequest, setGetExpensesParamsRequest] = useState<TGetExpensesParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    fromDate: moment().startOf('month')?.valueOf(),
    toDate: moment().endOf('month')?.valueOf(),
  });

  const {
    options: optionsCategories,
    handleLoadMore: handleLoadMoreCategories,
    handleSearch: handleSearchCategories,
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

  const handleOpenModalExpenseForm = (data?: TExpense): void => {
    setModalExpenseFormState({ visible: true, data });
  };

  const handleCloseModalExpenseForm = (): void => {
    setModalExpenseFormState({ visible: false });
  };

  const handleOpenModalDeleteExpense = (data?: TExpense): void => {
    setModalDeleteExpenseState({ visible: true, data });
  };

  const handleCloseModalDeleteExpense = (): void => {
    setModalDeleteExpenseState({ visible: false });
  };

  const handleSearch = (keyword?: string): void => {
    setGetExpensesParamsRequest({
      ...getExpensesParamsRequest,
      page: DEFAULT_PAGE,
      search: keyword,
    });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetExpensesParamsRequest({
      ...getExpensesParamsRequest,
      page,
      size,
      sort,
    });
  };

  const dataTableDropdownActions = (data?: TExpense): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalExpenseForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteExpense(data);
      },
    },
  ];

  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Đối tượng',
      sorter: true,
      keySort: 'category_name',
      className: 'limit-width',
      render: (_: string, record: TExpense): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.category?.name || EEmpty.DASH}</div>
            {record.receiver?.id && (
              <div className="Table-info-description">{record?.receiver?.name || EEmpty.DASH}</div>
            )}
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
      render: (_: string, record: TExpense): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title" style={{ color: EIconColor.POMEGRANATE }}>
              - {formatCurrency({ amount: record.amount || EEmpty.ZERO, showSuffix: true })}
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
      render: (_: string, record: TExpense): string =>
        record.at_date ? formatISODateToDateTime(record.at_date, EFormat['DD/MM/YYYY - HH:mm']) : EEmpty.DASH,
    },
    {
      key: 'branch',
      dataIndex: 'branch',
      title: 'Chi nhánh',
      render: (_: string, record: TExpense): React.ReactElement =>
        record?.branch ? (
          <Tags
            options={[
              {
                label: record?.branch.name,
                value: String(record?.branch.id),
                data: { iconName: EIconName.MapMarker },
              },
            ]}
          />
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'note',
      dataIndex: 'note',
      title: 'Ghi chú',
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TExpense): React.ReactElement => (
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

  const getExpenses = useCallback(() => {
    if (getExpensesParamsRequest.fromDate && getExpensesParamsRequest.toDate) {
      dispatch(
        getExpensesAction.request({
          params: getExpensesParamsRequest,
          headers: { branchIds: currentBranchId },
        }),
      );
    }
  }, [dispatch, getExpensesParamsRequest, currentBranchId]);

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  return (
    <div className="Expenses">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Expenses-filter">
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
                      label="Loại chi phí"
                      placeholder="Chọn dữ liệu"
                      value={optionsCategories.find((item) => item.value === getExpensesParamsRequest.categoryIds)}
                      showSearch
                      options={optionsCategories}
                      onSearch={handleSearchCategories}
                      onLoadMore={handleLoadMoreCategories}
                      allowClear
                      onChange={(option): void => {
                        setGetExpensesParamsRequest({
                          ...getExpensesParamsRequest,
                          page: DEFAULT_PAGE,
                          categoryIds: option?.value,
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
                          item.value === Number(getExpensesParamsRequest.paymentTypes as unknown as EPaymentType),
                      )}
                      options={dataPaymentTypeOptions}
                      allowClear
                      onChange={(option): void => {
                        setGetExpensesParamsRequest({
                          ...getExpensesParamsRequest,
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
                      value={moment(getExpensesParamsRequest.fromDate)}
                      label="Tháng"
                      picker="month"
                      format={EFormat['MM/YYYY']}
                      placeholder=" "
                      onChange={(data: Moment): void => {
                        setGetExpensesParamsRequest({
                          ...getExpensesParamsRequest,
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
          <Card className="Expenses-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <Row gutter={[16, 16]}>
                      <Col>
                        <div className="Table-total-item">
                          <Icon name={EIconName.Receipt} color={EIconColor.TUNDORA} />
                          Tổng Hoá Đơn: <strong>{expensesState?.total_elements || EEmpty.ZERO}</strong>
                        </div>
                      </Col>
                      <Col>
                        <div className="Table-total-item">
                          <Icon name={EIconName.Coins} color={EIconColor.TUNDORA} />
                          Tổng Chi Phí:{' '}
                          <strong>
                            {formatCurrency({ amount: expensesState?.sub_total || EEmpty.ZERO, showSuffix: true })}
                          </strong>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Button
                      title="Tạo mới Chi Phí"
                      styleType={EButtonStyleType.PURPLE}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                      onClick={handleOpenModalExpenseForm}
                    />
                  </Col>
                </Row>
              }
              loading={getExpensesLoading}
              columns={columns}
              dataSources={expensesState?.content || []}
              page={getExpensesParamsRequest?.page}
              pageSize={getExpensesParamsRequest?.size}
              total={expensesState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>

      <ModalExpenseForm {...modalExpenseFormState} onClose={handleCloseModalExpenseForm} onSuccess={getExpenses} />
      <ModalDeleteExpense
        {...modalDeleteExpenseState}
        onClose={handleCloseModalDeleteExpense}
        onSuccess={getExpenses}
      />
    </div>
  );
};

export default Expenses;
