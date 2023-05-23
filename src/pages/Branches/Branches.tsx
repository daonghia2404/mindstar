import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Input from '@/components/Input';
import Card from '@/components/Card';
import Table from '@/components/Table';
import DropdownMenu from '@/components/DropdownMenu';
import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import Status from '@/components/Status';
import ModalBranchForm from '@/pages/Branches/ModalBranchForm';
import ModalDeleteBranch from '@/pages/Branches/ModalDeleteBranch';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataAuditingStatusOptions } from '@/common/constants';
import { EAuditingStatus, EEmpty } from '@/common/enums';
import { EGetBranchesAction, getBranchesAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { TGetBranchesParams } from '@/services/api';

import './Branches.scss';
import { TBranch } from '@/common/models';
import Avatar from '@/components/Avatar';
import { getFullUrlStatics } from '@/utils/functions';

const Branches: React.FC = () => {
  const dispatch = useDispatch();

  const branchesState = useSelector((state: TRootState) => state.branchReducer.getBranchesResponse)?.data;
  const getBranchesLoading = useSelector((state: TRootState) => state.loadingReducer[EGetBranchesAction.GET_BRANCHES]);

  const [getBranchesParamsRequest, setGetBranchesParamsRequest] = useState<TGetBranchesParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    auditingStatuses: `${EAuditingStatus.ACTIVE},${EAuditingStatus.INACTIVE}`,
  });

  const [modalBranchFormState, setModalBranchFormState] = useState<{ visible: boolean; data?: any }>({
    visible: false,
  });
  const [modalDeleteBranchState, setModalDeleteBranchState] = useState<{ visible: boolean; data?: any }>({
    visible: false,
  });

  const handleOpenModalBranchForm = (data?: any): void => {
    setModalBranchFormState({ visible: true, data });
  };
  const handleCloseModalBranchForm = (): void => {
    setModalBranchFormState({ visible: false });
  };

  const handleOpenModalDeleteBranch = (data?: any): void => {
    setModalDeleteBranchState({ visible: true, data });
  };
  const handleCloseModalDeleteBranch = (): void => {
    setModalDeleteBranchState({ visible: false });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetBranchesParamsRequest({
      ...getBranchesParamsRequest,
      page,
      size,
      sort,
    });
  };

  const handleSearch = (keyword?: string): void => {
    setGetBranchesParamsRequest({
      ...getBranchesParamsRequest,
      page: DEFAULT_PAGE,
      branchName: keyword,
    });
  };

  const dataTableDropdownActions = (data?: any): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalBranchForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteBranch(data);
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
      width: 180,
      render: (_: string, record: TBranch): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.name || EEmpty.DASH}</div>
          <div className="Table-info-description">{record?.count_player || EEmpty.ZERO} thành viên</div>
        </div>
      ),
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'Địa chỉ',
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'manager',
      dataIndex: 'manager',
      title: 'Quản lý',
      render: (_: string, record: TBranch): React.ReactElement =>
        record?.managers && record?.managers?.length > 0 ? (
          <div className="Table-users">
            {record?.managers?.map((item) => (
              <div className="Table-users-item">
                <Avatar size={24} image={getFullUrlStatics(item.avatar)} />
                {item.name}
              </div>
            ))}
          </div>
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'primary_contact',
      dataIndex: 'primary_contact',
      title: 'Hotline',
      render: (value: string): React.ReactElement => (
        <a href={`tel: ${value}`} className="Table-link">
          {value}
        </a>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      keySort: 'auditing_status',
      render: (_: string, record: TBranch): React.ReactElement => {
        const status = dataAuditingStatusOptions.find((item) => item.value === record.auditing_status);
        return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : <>{EEmpty.DASH}</>;
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

  const getBranches = useCallback(() => {
    dispatch(getBranchesAction.request({ params: getBranchesParamsRequest }));
  }, [dispatch, getBranchesParamsRequest]);

  useEffect(() => {
    getBranches();
  }, [getBranches]);

  return (
    <div className="Branches">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Branches-filter">
            <Row gutter={[16, 16]}>
              <Col>
                <Input
                  style={{ minWidth: '24rem' }}
                  label="Tìm kiếm"
                  suffixIcon={<Icon name={EIconName.Search} color={EIconColor.MINE_SHAFT} />}
                  onSearch={handleSearch}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Branches-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.MapMarker} color={EIconColor.TUNDORA} />
                      Tổng Chi Nhánh: <strong>{branchesState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      title="Tạo mới Chi Nhánh"
                      styleType={EButtonStyleType.PURPLE}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                      onClick={handleOpenModalBranchForm}
                    />
                  </Col>
                </Row>
              }
              loading={getBranchesLoading}
              columns={columns}
              dataSources={branchesState?.content || []}
              page={getBranchesParamsRequest?.page}
              pageSize={getBranchesParamsRequest?.size}
              total={branchesState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>

      <ModalBranchForm {...modalBranchFormState} onClose={handleCloseModalBranchForm} onSuccess={getBranches} />
      <ModalDeleteBranch {...modalDeleteBranchState} onClose={handleCloseModalDeleteBranch} onSuccess={getBranches} />
    </div>
  );
};

export default Branches;
