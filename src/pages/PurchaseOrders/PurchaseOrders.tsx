import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@/components/Card';
import { TSelectOption } from '@/components/Select';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import Input from '@/components/Input';
import { TRootState } from '@/redux/reducers';
import Table from '@/components/Table';
import Button, { EButtonStyleType } from '@/components/Button';
import { EEmpty } from '@/common/enums';
import { EGetRedeemsAction, getRedeemsAction } from '@/redux/actions';
import DropdownMenu from '@/components/DropdownMenu';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import Avatar from '@/components/Avatar';
import Status, { EStatusStyleType } from '@/components/Status';
import ModalPurchaseOrdersForm from './ModalPurchaseOrdersForm';
import ModalDeletePurchaseOrder from './ModalPurchaseOrdersDelete';

import './PurchaseOrders.scss';

const PurchaseOrders: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getPurchaseOrdersLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetRedeemsAction.GET_REDEEMS],
  );
  const PurchaseOrdersState = useSelector((state: TRootState) => state.redeemReducer.getRedeemsResponse)?.data;

  const [getPurchaseOrdersParamsRequest, setGetPurchaseOrdersParamsRequest] = useState<any>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
  });
  const [modalPurchaseOrderFormState, setModalPurchaseOrderFormState] = useState<{ visible: boolean; data?: any }>({
    visible: false,
  });
  const [modalDeletePurchaseOrderstate, setModalDeletePurchaseOrderstate] = useState<{ visible: boolean; data?: any }>({
    visible: false,
  });

  const handleOpenModalPurchaseOrderForm = (data?: any): void => {
    setModalPurchaseOrderFormState({ visible: true, data });
  };
  const handleCloseModalPurchaseOrderForm = (): void => {
    setModalPurchaseOrderFormState({ visible: false });
  };
  const handleOpenModalDeletePurchaseOrder = (data?: any): void => {
    setModalDeletePurchaseOrderstate({ visible: true, data });
  };
  const handleCloseModalDeletePurchaseOrder = (): void => {
    setModalDeletePurchaseOrderstate({ visible: false });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetPurchaseOrdersParamsRequest({
      ...getPurchaseOrdersParamsRequest,
      page,
      size,
      sort,
    });
  };
  const handleSearch = (keyword?: string): void => {
    setGetPurchaseOrdersParamsRequest({
      ...getPurchaseOrdersParamsRequest,
      page: DEFAULT_PAGE,
      search: keyword,
    });
  };
  const dataTableDropdownActions = (data?: any): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalPurchaseOrderForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeletePurchaseOrder(data);
      },
    },
  ];
  const columns = [
    {
      key: 'no',
      dataIndex: 'no',
      title: 'Mã Đơn Hàng',
      width: 30,
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.id}</div>
          </div>
        );
      },
    },
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: 'Sản Phẩm',
      width: 48,
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-image">
          {/* <Avatar size={48} image={getFullUrlStatics(record?.player_profile?.avatar)} /> */}
          <Avatar shape="square" size={48} image={record?.image} />
        </div>
      ),
    },
    {
      key: 'item',
      dataIndex: 'item',
      title: 'Mô Tả Sản Phẩm',
      sorter: true,
      width: 400,
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.item}</div>
          </div>
        );
      },
    },
    {
      key: 'cog',
      dataIndex: 'cog',
      title: 'Tổng Giá Trị',
      className: 'limit-width',
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title" style={{ color: EIconColor.PURPLE_HEART }}>
              {record?.cog}
            </div>
          </div>
        );
      },
    },
    {
      key: 'qtyHand',
      dataIndex: 'qtyHand',
      title: 'Số Lượng Nhập',
      className: 'limit-width',
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.hand}</div>
          </div>
        );
      },
    },
    {
      key: 'qtySold',
      dataIndex: 'qtySold',
      title: 'Số Lượng Bán',
      className: 'limit-width',
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.sold}</div>
          </div>
        );
      },
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      // render: (_: string, record: TRedeem): React.ReactElement => {
      //   const status = dataOrderStatusOptions.find((item) => item.value === record.redeem_status);
      //   return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : <>{EEmpty.DASH}</>;
      // },
      render: (): React.ReactElement => {
        return (
          <div className="Table-info">
            <Status label="Đang Xử Lý" styleType={EStatusStyleType.SUCCESS} />
          </div>
        );
      },
    },
    {
      key: 'poDate',
      dataIndex: 'poDate',
      title: 'Ngày Tạo',
      className: 'nowrap',
      // render: (_: string, record: TRedeem): string =>
      //   record.issue_date ? formatISODateToDateTime(record.issue_date, EFormat['DD/MM/YYYY - HH:mm']) : EEmpty.DASH,
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.day}</div>
          </div>
        );
      },
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: any): React.ReactElement => (
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
      key: '1',
      id: '1',
      item: 'Giày Đá Bóng Người Lớn, Giày Đá Banh Sân Cỏ Nhân Tạo Mira Pro Chất Liệu Da PU Cao Cấp Mẫu Mới Nhất 2021',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      desc: 'Tập Sự',
      timekeeping: '19.0',
      cog: '21.000.000 đ',
      hand: '1121',
      sold: '14',
      day: '01/01/1970 - 09:16',
    },
    {
      key: '1',
      id: '1',
      item: 'Giày Đá Bóng Người Lớn, Giày Đá Banh Sân Cỏ Nhân Tạo Mira Pro Chất Liệu Da PU Cao Cấp Mẫu Mới Nhất 2021',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      desc: 'Tập Sự',
      timekeeping: '19.0',
      cog: '21.000.000 đ',
      hand: '1121',
      sold: '14',
      day: '01/01/1970 - 09:16',
    },
    {
      key: '1',
      id: '1',
      item: 'Giày Đá Bóng Người Lớn, Giày Đá Banh Sân Cỏ Nhân Tạo Mira Pro Chất Liệu Da PU Cao Cấp Mẫu Mới Nhất 2021',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      desc: 'Tập Sự',
      timekeeping: '19.0',
      cog: '21.000.000 đ',
      hand: '1121',
      sold: '14',
      day: '01/01/1970 - 09:16',
    },
    {
      key: '1',
      id: '1',
      item: 'Giày Đá Bóng Người Lớn, Giày Đá Banh Sân Cỏ Nhân Tạo Mira Pro Chất Liệu Da PU Cao Cấp Mẫu Mới Nhất 2021',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      desc: 'Tập Sự',
      timekeeping: '19.0',
      cog: '21.000.000 đ',
      hand: '1121',
      sold: '14',
      day: '01/01/1970 - 09:16',
    },
  ];

  const getPurchaseOrders = useCallback(() => {
    dispatch(
      getRedeemsAction.request({
        params: {
          ...getPurchaseOrdersParamsRequest,
          orderStatuses: (getPurchaseOrdersParamsRequest?.orderStatuses as unknown as TSelectOption)?.value,
        },
        headers: { branchIds: currentBranchId },
      }),
    );
  }, [dispatch, getPurchaseOrdersParamsRequest, currentBranchId]);

  useEffect(() => {
    getPurchaseOrders();
  }, [getPurchaseOrders]);

  return (
    <div className="PurchaseOrders">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="PurchaseOrders-filter">
            <Row gutter={[16, 16]}>
              <Col span={22}>
                <Row gutter={[24, 24]}>
                  <Col>
                    <Input
                      style={{ minWidth: '24rem' }}
                      label="Tìm kiếm"
                      suffixIcon={<Icon name={EIconName.Search} color={EIconColor.TUNDORA} />}
                      onSearch={handleSearch}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="PurchaseOrders-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.PackageImport} color={EIconColor.TUNDORA} />
                      Tổng Nhập Hàng: <strong>{PurchaseOrdersState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                </Row>
              }
              loading={getPurchaseOrdersLoading}
              columns={columns}
              dataSources={dataSources}
              page={getPurchaseOrdersParamsRequest?.page}
              pageSize={getPurchaseOrdersParamsRequest?.size}
              total={PurchaseOrdersState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>
      <ModalPurchaseOrdersForm
        {...modalPurchaseOrderFormState}
        onClose={handleCloseModalPurchaseOrderForm}
        onSuccess={getPurchaseOrders}
      />
      <ModalDeletePurchaseOrder
        {...modalDeletePurchaseOrderstate}
        onClose={handleCloseModalDeletePurchaseOrder}
        onSuccess={getPurchaseOrders}
      />
    </div>
  );
};

export default PurchaseOrders;
