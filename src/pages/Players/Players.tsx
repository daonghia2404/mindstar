import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataDegreeTypeOptions } from '@/common/constants';
import { EEmpty, EFormat } from '@/common/enums';
import Button, { EButtonStyleType } from '@/components/Button';
import Card from '@/components/Card';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import { TGetPlayersParams } from '@/services/api';
import Table from '@/components/Table';
import { TRootState } from '@/redux/reducers';
import { EGetPlayersAction, getPlayersAction } from '@/redux/actions';
import DropdownMenu from '@/components/DropdownMenu';
import { TUser } from '@/common/models';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import Avatar from '@/components/Avatar';
import { formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import ModalPlayerForm from '@/pages/Players/ModalPlayerForm';
import ModalDeletePlayer from '@/pages/Players/ModalDeletePlayer';
import { Paths } from '@/pages/routers';
import Tags from '@/components/Tags';

import './Players.scss';

const Players: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getPlayersLoading = useSelector((state: TRootState) => state.loadingReducer[EGetPlayersAction.GET_PLAYERS]);
  const playersState = useSelector((state: TRootState) => state.playerReducer.getPlayersResponse)?.data;
  const [modalPlayerFormState, setModalPlayerFormState] = useState<{ visible: boolean; data?: TUser }>({
    visible: false,
  });
  const [modalDeletePlayerState, setModalDeletePlayerState] = useState<{ visible: boolean; data?: TUser }>({
    visible: false,
  });

  const [getPlayersParamsRequest, setGetPlayersParamsRequest] = useState<TGetPlayersParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
  });

  const handleOpenModalPlayerForm = (data?: TUser): void => {
    setModalPlayerFormState({ visible: true, data });
  };

  const handleCloseModalPlayerForm = (): void => {
    setModalPlayerFormState({ visible: false });
  };

  const handleOpenModalDeletePlayer = (data?: TUser): void => {
    setModalDeletePlayerState({ visible: true, data });
  };

  const handleCloseModalDeletePlayer = (): void => {
    setModalDeletePlayerState({ visible: false });
  };

  const handleSearch = (keyword?: string): void => {
    setGetPlayersParamsRequest({
      ...getPlayersParamsRequest,
      page: DEFAULT_PAGE,
      name: keyword,
    });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetPlayersParamsRequest({
      ...getPlayersParamsRequest,
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
        navigate(Paths.PlayerDetail(String(data?.id)));
      },
    },
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalPlayerForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeletePlayer(data);
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
          <a href={`tel: ${value}`} className="Table-link" onClick={(e): void => e.stopPropagation()}>
            {value}
          </a>
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'class',
      dataIndex: 'class',
      title: 'Lớp Học',
      render: (_: string, record: TUser): React.ReactElement =>
        record?.class ? (
          <Tags
            options={[
              {
                label: record?.class.name,
                value: String(record?.class.id),
                data: { iconName: EIconName.ChalkBoard },
                onClick: (): void => {
                  navigate(Paths.ClassDetail(String(record?.class.id)));
                },
              },
            ]}
          />
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'branch',
      dataIndex: 'branch',
      title: 'Chi nhánh',
      render: (_: string, record: TUser): React.ReactElement =>
        record?.branch_id ? (
          <Tags
            options={[
              {
                label: record?.branch_name,
                value: String(record?.branch_id),
                data: { iconName: EIconName.MapMarker },
              },
            ]}
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

  const getPlayers = useCallback(() => {
    dispatch(getPlayersAction.request({ params: getPlayersParamsRequest, headers: { branchIds: currentBranchId } }));
  }, [dispatch, getPlayersParamsRequest, currentBranchId]);

  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

  return (
    <div className="Players">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Players-filter">
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
          <Card className="Players-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.MapMarker} color={EIconColor.TUNDORA} />
                      Tổng Học Viên: <strong>{playersState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      title="Tạo mới Học Viên"
                      styleType={EButtonStyleType.PURPLE}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                      onClick={handleOpenModalPlayerForm}
                    />
                  </Col>
                </Row>
              }
              loading={getPlayersLoading}
              columns={columns}
              dataSources={playersState?.content || []}
              page={getPlayersParamsRequest?.page}
              pageSize={getPlayersParamsRequest?.size}
              total={playersState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>

      <ModalPlayerForm {...modalPlayerFormState} onClose={handleCloseModalPlayerForm} onSuccess={getPlayers} />
      <ModalDeletePlayer {...modalDeletePlayerState} onClose={handleCloseModalDeletePlayer} onSuccess={getPlayers} />
    </div>
  );
};

export default Players;
