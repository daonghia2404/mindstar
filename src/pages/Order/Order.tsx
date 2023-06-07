import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { TClass } from '@/common/models';
import Button, { EButtonStyleType } from '@/components/Button';
import Card from '@/components/Card';
import DropdownMenu from '@/components/DropdownMenu';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import Table from '@/components/Table';
import { EGetClassesAction, getClassesAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { TGetClassesParams } from '@/services/api';

import './Order.scss';
import Select from '@/components/Select';
import ModalOrderForm from './ModalOrderForm';
import ModalDeleteOrder from './ModalDeleteOrder';

const Order: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getOrderLoading = useSelector((state: TRootState) => state.loadingReducer[EGetClassesAction.GET_CLASSES]);
  const classsState = useSelector((state: TRootState) => state.classReducer.getClassesResponse)?.data;
  const [modalOrderFormState, setModalOrderFormState] = useState<{ visible: boolean; data?: any }>({
    visible: false,
  });
  const [modalDeleteOrderState, setModalDeleteOrderState] = useState<{ visible: boolean; data?: any }>({
    visible: false,
  });
  const [getOrderParamsRequest, setGetOrderParamsRequest] = useState<TGetClassesParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
  });

  const handleOpenModalOrderForm = (data?: any): void => {
    setModalOrderFormState({ visible: true, data });
  };

  const handleCloseModalOrderForm = (): void => {
    setModalOrderFormState({ visible: false });
  };

  const handleOpenModalDeleteOrder = (data?: TClass): void => {
    setModalDeleteOrderState({ visible: true, data });
  };

  const handleCloseModalDeleteOrder = (): void => {
    setModalDeleteOrderState({ visible: false });
  };

  const handleSearch = (keyword?: string): void => {
    setGetOrderParamsRequest({
      ...getOrderParamsRequest,
      page: DEFAULT_PAGE,
      name: keyword,
    });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetOrderParamsRequest({
      ...getOrderParamsRequest,
      page,
      size,
      sort,
    });
  };

  const dataTableDropdownActions = (data?: any): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalOrderForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteOrder(data);
      },
    },
  ];

  const columns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
      keySort: 'id',
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.id}</div>
          </div>
        );
      },
    },
    {
      key: 'custumer',
      dataIndex: 'custumer',
      title: 'Khách Hàng',
      sorter: true,
      keySort: 'custumer',
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.name}</div>
            <div className="Table-info-description">{record?.phone}</div>
            <div className="Table-info-description">{record?.address}</div>
          </div>
        );
      },
    },
    {
      key: 'product',
      dataIndex: 'product',
      title: 'Sản Phẩm',
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.product}</div>
          </div>
        );
      },
    },
    {
      key: 'quantity',
      dataIndex: 'quantity',
      title: 'Số Lượng',
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.quantity}</div>
          </div>
        );
      },
    },
    {
      key: 'total payment',
      dataIndex: 'total payment',
      title: 'Tổng Tiền Thanh Toán',
      sorter: true,
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.money}</div>
            <div className="Table-info-description">{record?.pay}</div>
          </div>
        );
      },
    },
    {
      key: 'date',
      dataIndex: 'date',
      title: 'Ngày',
      sorter: true,
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.date}</div>
            <div className="Table-info-description">{record?.hour}</div>
          </div>
        );
      },
    },
    {
      key: 'payment',
      dataIndex: 'payment',
      title: 'Sự Chi Trả',
      sorter: true,
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.payment}</div>
          </div>
        );
      },
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng Thái',
      sorter: true,
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.status}</div>
          </div>
        );
      },
    },
    {
      key: 'notes',
      dataIndex: 'notes',
      title: 'Ghi Chú',
      sorter: true,
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.note}</div>
          </div>
        );
      },
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TClass): React.ReactElement => (
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
  const dataSources = [
    {
      id: '1',
      name: 'Trinh Van Huan',
      phone: '0866743141',
      address: '190 NGo Xuan Quang',
      product: 'Product',
      quantity: '1',
      money: '900.000 đ',
      pay: 'Tiền Mặt',
      date: 'Ngày 30 Tháng 5, 2023',
      hour: '09:34',
      payment: 'New',
      status: 'Hoàn Thành',
    },
    {
      id: '1',
      name: 'Trinh Van Huan',
      phone: '0866743141',
      address: '190 NGo Xuan Quang',
      product: 'Product',
      quantity: '1',
      money: '900.000 đ',
      pay: 'Tiền Mặt',
      date: 'Ngày 30 Tháng 5, 2023',
      hour: '09:34',
      payment: 'New',
      status: 'Hoàn Thành',
    },
    {
      id: '2',
      name: 'Trinh Van Huan',
      phone: '0866743141',
      address: '190 NGo Xuan Quang',
      product: 'Product',
      quantity: '1',
      money: '900.000 đ',
      pay: 'Tiền Mặt',
      date: 'Ngày 30 Tháng 5, 2023',
      hour: '09:34',
      payment: 'New',
      status: 'Hoàn Thành',
    },
    {
      id: '3',
      name: 'Trinh Van Huan',
      phone: '0866743141',
      address: '190 NGo Xuan Quang',
      product: 'Product',
      quantity: '1',
      money: '900.000 đ',
      pay: 'Tiền Mặt',
      date: 'Ngày 30 Tháng 5, 2023',
      hour: '09:34',
      payment: 'New',
      status: 'Hoàn Thành',
    },
    {
      id: '4',
      name: 'Trinh Van Huan',
      phone: '0866743141',
      address: '190 NGo Xuan Quang',
      product: 'Product',
      quantity: '1',
      money: '900.000 đ',
      pay: 'Tiền Mặt',
      date: 'Ngày 30 Tháng 5, 2023',
      hour: '09:34',
      payment: 'New',
      status: 'Hoàn Thành',
    },
    {
      id: '5',
      name: 'Trinh Van Huan',
      phone: '0866743141',
      address: '190 NGo Xuan Quang',
      product: 'Product',
      quantity: '1',
      money: '900.000 đ',
      pay: 'Tiền Mặt',
      date: 'Ngày 30 Tháng 5, 2023',
      hour: '09:34',
      payment: 'New',
      status: 'Hoàn Thành',
    },
  ];

  const getOrder = useCallback(() => {
    dispatch(getClassesAction.request({ params: getOrderParamsRequest, headers: { branchIds: currentBranchId } }));
  }, [dispatch, getOrderParamsRequest, currentBranchId]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  return (
    <div className="Order">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Order-filter">
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
                <Select label="All Orders Status" placement="topLeft" size="middle" />
              </Col>
              <Col>
                <Select label="All Payment Status" placement="topLeft" size="middle" />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Order-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.Receipt} color={EIconColor.TUNDORA} />
                      Tổng Đơn Hàng:
                      {/* <strong>{classsState?.total_elements || EEmpty.ZERO}</strong> */}
                    </div>
                  </Col>
                </Row>
              }
              loading={getOrderLoading}
              columns={columns}
              dataSources={dataSources}
              page={getOrderParamsRequest?.page}
              pageSize={getOrderParamsRequest?.size}
              total={classsState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>

      <ModalOrderForm {...modalOrderFormState} onClose={handleCloseModalOrderForm} onSuccess={getOrder} />
      <ModalDeleteOrder {...modalDeleteOrderState} onClose={handleCloseModalDeleteOrder} onSuccess={getOrder} />
    </div>
  );
};

export default Order;
