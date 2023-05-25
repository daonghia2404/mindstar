import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataDegreeTypeOptions } from '@/common/constants';
import { EEmpty, EFormat, EUserType } from '@/common/enums';
import Button, { EButtonStyleType } from '@/components/Button';
import Card from '@/components/Card';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import { TGetManagersParams } from '@/services/api';
import Table from '@/components/Table';
import { TRootState } from '@/redux/reducers';
import { EGetManagersAction, getManagersAction } from '@/redux/actions';
import DropdownMenu from '@/components/DropdownMenu';
import { TUser } from '@/common/models';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import Avatar from '@/components/Avatar';
import { formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import ModalManagerForm from '@/pages/Managers/ModalManagerForm';
import ModalDeleteManager from '@/pages/Managers/ModalDeleteManager';
import { Paths } from '@/pages/routers';
import Tags from '@/components/Tags';

import './Managers.scss';

const Managers: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getManagersLoading = useSelector((state: TRootState) => state.loadingReducer[EGetManagersAction.GET_MANAGERS]);
  const managersState = useSelector((state: TRootState) => state.managerReducer.getManagersResponse)?.data;
  const [modalManagerFormState, setModalManagerFormState] = useState<{ visible: boolean; data?: TUser }>({
    visible: false,
  });
  const [modalDeleteManagerState, setModalDeleteManagerState] = useState<{ visible: boolean; data?: TUser }>({
    visible: false,
  });

  const [getManagersParamsRequest, setGetManagersParamsRequest] = useState<TGetManagersParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    userType: EUserType.TEACHER,
  });

  const handleOpenModalManagerForm = (data?: TUser): void => {
    setModalManagerFormState({ visible: true, data });
  };

  const handleCloseModalManagerForm = (): void => {
    setModalManagerFormState({ visible: false });
  };

  const handleOpenModalDeleteManager = (data?: TUser): void => {
    setModalDeleteManagerState({ visible: true, data });
  };

  const handleCloseModalDeleteManager = (): void => {
    setModalDeleteManagerState({ visible: false });
  };

  const handleSearch = (keyword?: string): void => {
    setGetManagersParamsRequest({
      ...getManagersParamsRequest,
      page: DEFAULT_PAGE,
      name: keyword,
    });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetManagersParamsRequest({
      ...getManagersParamsRequest,
      page,
      size,
      sort,
    });
  };

  const dataTableDropdownActions = (data?: TUser): TDropdownMenuItem[] => [
    {
      value: 'view',
      label: 'Chi Tiết',
      icon: EIconName.Eye,
      onClick: (): void => {
        navigate(Paths.ManagerDetail(String(data?.id)));
      },
    },
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalManagerForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteManager(data);
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
      className: 'limit-width',
      width: 180,
      render: (_: string, record: TUser): React.ReactElement => {
        const dergeeType = dataDegreeTypeOptions.find((item) => item.value === record.degree_type);
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.name || EEmpty.DASH}</div>
            <div className="Table-info-description" style={{ color: dergeeType?.data?.color }}>
              {dergeeType?.label}
            </div>
          </div>
        );
      },
    },
    {
      key: 'date_of_birth',
      dataIndex: 'date_of_birth',
      title: 'Ngày Sinh',
      render: (_: string, record: TUser): string =>
        record?.date_of_birth ? formatISODateToDateTime(record.date_of_birth, EFormat['DD/MM/YYYY']) : EEmpty.DASH,
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'Địa chỉ',
      className: 'limit-width',
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'mobile',
      dataIndex: 'mobile',
      title: 'Số điện thoại',
      render: (value: string): React.ReactElement =>
        value ? (
          <a href={`tel: ${value}`} className="Table-link">
            {value}
          </a>
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'classes',
      dataIndex: 'classes',
      title: 'Lớp Học',
      render: (_: string, record: TUser): React.ReactElement =>
        record?.classes && record?.classes?.length > 0 ? (
          <Tags
            options={record?.classes?.map((item) => ({
              label: item.name,
              value: String(item.id),
              data: { iconName: EIconName.ChalkBoard },
              onClick: (): void => {
                navigate(Paths.ClassDetail(String(item.id)));
              },
            }))}
          />
        ) : (
          <>{EEmpty.DASH}</>
        ),
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

  const getManagers = useCallback(() => {
    dispatch(getManagersAction.request({ params: getManagersParamsRequest, headers: { branchIds: currentBranchId } }));
  }, [dispatch, getManagersParamsRequest, currentBranchId]);

  useEffect(() => {
    getManagers();
  }, [getManagers]);

  return (
    <div className="Managers">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Managers-filter">
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
          <Card className="Managers-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.MapMarker} color={EIconColor.TUNDORA} />
                      Tổng Giáo Viên: <strong>{managersState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      title="Tạo mới Giáo Viên"
                      styleType={EButtonStyleType.PURPLE}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                      onClick={handleOpenModalManagerForm}
                    />
                  </Col>
                </Row>
              }
              loading={getManagersLoading}
              columns={columns}
              dataSources={managersState?.content || []}
              page={getManagersParamsRequest?.page}
              pageSize={getManagersParamsRequest?.size}
              total={managersState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>

      <ModalManagerForm {...modalManagerFormState} onClose={handleCloseModalManagerForm} onSuccess={getManagers} />
      <ModalDeleteManager
        {...modalDeleteManagerState}
        onClose={handleCloseModalDeleteManager}
        onSuccess={getManagers}
      />
    </div>
  );
};

export default Managers;
