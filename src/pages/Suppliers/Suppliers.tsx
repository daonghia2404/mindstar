import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@/components/Card';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataAuditingStatusOptions } from '@/common/constants';
import Input from '@/components/Input';
import { TRootState } from '@/redux/reducers';
import Table from '@/components/Table';
import Button, { EButtonStyleType } from '@/components/Button';
import { EAuditingStatus, EEmpty, EFormat } from '@/common/enums';
import { EGetSuppliersAction, getSuppliersAction } from '@/redux/actions';
import { TSupplier } from '@/common/models';
import { formatCurrency, formatISODateToDateTime } from '@/utils/functions';
import DropdownMenu from '@/components/DropdownMenu';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import { TGetSuppliersParams } from '@/services/api';
import Status from '@/components/Status';
import ModalSupplierForm from '@/pages/Suppliers/ModalSupplierForm';
import ModalDeleteSupplier from '@/pages/Suppliers/ModalDeleteSupplier';

import './Suppliers.scss';

const Suppliers: React.FC = () => {
  const dispatch = useDispatch();
  const getSuppliersLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetSuppliersAction.GET_SUPPLIERS],
  );
  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;

  const suppliersState = useSelector((state: TRootState) => state.supplierReducer.getSuppliersResponse)?.data;

  const [getSuppliersParamsRequest, setGetSuppliersParamsRequest] = useState<TGetSuppliersParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    auditingStatuses: `${EAuditingStatus.ACTIVE},${EAuditingStatus.INACTIVE}`,
  });
  const [modalSuppliersFormState, setModalSupplierFormState] = useState<{ visible: boolean; data?: TSupplier }>({
    visible: false,
  });
  const [modalDeleteSuppliersState, setModalDeleteSupplierState] = useState<{ visible: boolean; data?: any }>({
    visible: false,
  });

  const handleOpenModalSupplierForm = (data?: TSupplier): void => {
    setModalSupplierFormState({ visible: true, data });
  };
  const handleCloseModalSupplierForm = (): void => {
    setModalSupplierFormState({ visible: false });
  };
  const handleOpenModalDeleteSupplier = (data?: TSupplier): void => {
    setModalDeleteSupplierState({ visible: true, data });
  };
  const handleCloseModalDeleteSupplier = (): void => {
    setModalDeleteSupplierState({ visible: false });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetSuppliersParamsRequest({
      ...getSuppliersParamsRequest,
      page,
      size,
      sort,
    });
  };
  const handleSearch = (keyword?: string): void => {
    setGetSuppliersParamsRequest({
      ...getSuppliersParamsRequest,
      page: DEFAULT_PAGE,
      search: keyword,
    });
  };
  const dataTableDropdownActions = (data?: TSupplier): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalSupplierForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteSupplier(data);
      },
    },
  ];
  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      sorter: true,
      keySort: 'name',
      className: 'limit-width',
      render: (_: string, record: TSupplier): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.name || EEmpty.DASH}</div>
            <div className="Table-info-description">{record?.contact_name || EEmpty.DASH}</div>
            {record.contact_number ? (
              <a
                href={`tel: ${record.contact_number}`}
                className="Table-link"
                onClick={(e): void => e.stopPropagation()}
              >
                {record.contact_number}
              </a>
            ) : (
              <div className="Table-info-description">{EEmpty.DASH}</div>
            )}
          </div>
        );
      },
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'Địa chỉ',
      className: 'limit-width',
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'totalProvided',
      dataIndex: 'totalProvided',
      title: 'Tổng cung cấp',
      className: 'nowrap',
      render: (_: string, record: TSupplier): React.ReactElement => (
        <span>{formatCurrency({ amount: record.total_provided || EEmpty.ZERO, showSuffix: true })}</span>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      keySort: 'auditing_status',
      render: (_: string, record: TSupplier): React.ReactElement => {
        const status = dataAuditingStatusOptions.find((item) => item.value === record.auditing_status);
        return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : <>{EEmpty.DASH}</>;
      },
    },
    {
      key: 'createDate',
      dataIndex: 'createDate',
      title: 'Ngày Tạo',
      className: 'nowrap',
      render: (_: string, record: TSupplier): string =>
        record?.create_date ? formatISODateToDateTime(record.create_date, EFormat['DD/MM/YYYY']) : EEmpty.DASH,
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TSupplier): React.ReactElement => (
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

  const getSuppliers = useCallback(() => {
    dispatch(
      getSuppliersAction.request({
        params: getSuppliersParamsRequest,
        headers: { branchIds: currentBranchId },
      }),
    );
  }, [dispatch, getSuppliersParamsRequest, currentBranchId]);

  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);

  return (
    <div className="Suppliers">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Suppliers-filter">
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
          <Card className="Suppliers-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.BoxSeam} color={EIconColor.TUNDORA} />
                      Tổng Nhà Phân Phối: <strong>{suppliersState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      title="Tạo mới Nhà Phân Phối"
                      styleType={EButtonStyleType.PURPLE}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                      onClick={handleOpenModalSupplierForm}
                    />
                  </Col>
                </Row>
              }
              loading={getSuppliersLoading}
              columns={columns}
              dataSources={suppliersState?.content || []}
              page={getSuppliersParamsRequest.page}
              pageSize={getSuppliersParamsRequest.size}
              total={suppliersState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>
      <ModalSupplierForm {...modalSuppliersFormState} onClose={handleCloseModalSupplierForm} onSuccess={getSuppliers} />
      <ModalDeleteSupplier
        {...modalDeleteSuppliersState}
        onClose={handleCloseModalDeleteSupplier}
        onSuccess={getSuppliers}
      />
    </div>
  );
};

export default Suppliers;
