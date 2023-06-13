import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataAuditingStatusOptions, dataUserTypeOptions } from '@/common/constants';
import { EAuditingStatus, EEmpty, EFormat } from '@/common/enums';
import Button, { EButtonStyleType } from '@/components/Button';
import Card from '@/components/Card';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import { TGetUsersParams } from '@/services/api';
import Table from '@/components/Table';
import { TRootState } from '@/redux/reducers';
import { EGetUsersAction, getUsersAction } from '@/redux/actions';
import DropdownMenu from '@/components/DropdownMenu';
import { TUser } from '@/common/models';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import Avatar from '@/components/Avatar';
import { formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import ModalUserForm from '@/pages/Users/ModalUserForm';
import ModalDeleteUser from '@/pages/Users/ModalDeleteUser';
import Tags from '@/components/Tags';
import Status from '@/components/Status';

import './Users.scss';

const Users: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getUsersLoading = useSelector((state: TRootState) => state.loadingReducer[EGetUsersAction.GET_USERS]);
  const usersState = useSelector((state: TRootState) => state.userReducer.getUsersResponse)?.data;
  const [modalUserFormState, setModalUserFormState] = useState<{ visible: boolean; data?: TUser }>({
    visible: false,
  });
  const [modalDeleteUserState, setModalDeleteUserState] = useState<{ visible: boolean; data?: TUser }>({
    visible: false,
  });

  const [getUsersParamsRequest, setGetUsersParamsRequest] = useState<TGetUsersParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    auditingStatuses: `${EAuditingStatus.ACTIVE},${EAuditingStatus.INACTIVE}`,
  });

  const handleOpenModalUserForm = (data?: TUser): void => {
    setModalUserFormState({ visible: true, data });
  };

  const handleCloseModalUserForm = (): void => {
    setModalUserFormState({ visible: false });
  };

  const handleOpenModalDeleteUser = (data?: TUser): void => {
    setModalDeleteUserState({ visible: true, data });
  };

  const handleCloseModalDeleteUser = (): void => {
    setModalDeleteUserState({ visible: false });
  };

  const handleSearch = (keyword?: string): void => {
    setGetUsersParamsRequest({
      ...getUsersParamsRequest,
      page: DEFAULT_PAGE,
      search: keyword,
    });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetUsersParamsRequest({
      ...getUsersParamsRequest,
      page,
      size,
      sort,
    });
  };

  const dataTableDropdownActions = (data?: TUser): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalUserForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteUser(data);
      },
    },
  ];

  const columns = [
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: '',
      width: 48,
      render: (_: string, record: TUser): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={48} image={getFullUrlStatics(record?.avatar)} />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      sorter: true,
      keySort: 'name',
      className: 'limit-width',
      width: 180,
      render: (_: string, record: TUser): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.name || EEmpty.DASH}</div>
            <div className="Table-info-description">
              {record?.date_of_birth
                ? formatISODateToDateTime(record.date_of_birth, EFormat['DD/MM/YYYY'])
                : EEmpty.DASH}
            </div>
            {record.mobile ? (
              <a href={`tel: ${record.mobile}`} className="Table-link" onClick={(e): void => e.stopPropagation()}>
                {record.mobile}
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
      key: 'branch',
      dataIndex: 'branch',
      title: 'Chi nhánh',
      render: (_: string, record: TUser): React.ReactElement =>
        record?.branch ? (
          <Tags
            options={[
              {
                label: record?.branch?.name,
                value: String(record?.branch?.id),
                data: { iconName: EIconName.MapMarker },
              },
            ]}
          />
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Vai trò',
      sorter: true,
      keySort: 'user_type',
      className: 'limit-width',
      render: (_: string, record: TUser): React.ReactElement => {
        const status = dataUserTypeOptions.find((item) => item.value === record.user_type);
        return status ? (
          <Tags
            options={[
              {
                label: status.label,
                value: status.value,
                data: { tagType: status.data.tagType },
              },
            ]}
          />
        ) : (
          <>{EEmpty.DASH}</>
        );
      },
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      render: (_: string, record: TUser): React.ReactElement => {
        const status = dataAuditingStatusOptions.find((item) => item.value === record.auditing_status);
        return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : <>{EEmpty.DASH}</>;
      },
    },
    {
      key: 'lastActivity',
      dataIndex: 'lastActivity',
      title: 'Thời gian hoạt động lần cuối',
      render: (_: string, record: TUser): string =>
        record?.latest_login_at
          ? formatISODateToDateTime(record.latest_login_at, EFormat['DD/MM/YYYY - HH:mm'])
          : EEmpty.DASH,
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TUser): React.ReactElement => (
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

  const getUsers = useCallback(() => {
    dispatch(
      getUsersAction.request({
        paths: { suffix: 'user-type-restricted=player,teacher' },
        params: getUsersParamsRequest,
        headers: { branchIds: currentBranchId },
      }),
    );
  }, [dispatch, getUsersParamsRequest, currentBranchId]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="Users">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Users-filter">
            <Row gutter={[16, 16]}>
              <Col>
                <Input
                  style={{ minWidth: '24rem' }}
                  label="Tìm kiếm"
                  suffixIcon={<Icon name={EIconName.Search} color={EIconColor.TUNDORA} />}
                  onSearch={handleSearch}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Users-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.UsersGroup} color={EIconColor.TUNDORA} />
                      Tổng Người Dùng: <strong>{usersState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      title="Tạo mới Người Dùng"
                      styleType={EButtonStyleType.PURPLE}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                      onClick={handleOpenModalUserForm}
                    />
                  </Col>
                </Row>
              }
              loading={getUsersLoading}
              columns={columns}
              dataSources={usersState?.content || []}
              page={getUsersParamsRequest?.page}
              pageSize={getUsersParamsRequest?.size}
              total={usersState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>

      <ModalUserForm {...modalUserFormState} onClose={handleCloseModalUserForm} onSuccess={getUsers} />
      <ModalDeleteUser {...modalDeleteUserState} onClose={handleCloseModalDeleteUser} onSuccess={getUsers} />
    </div>
  );
};

export default Users;
