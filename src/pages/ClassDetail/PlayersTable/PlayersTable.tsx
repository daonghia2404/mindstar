import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';

import Table from '@/components/Table';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataAuditingStatusOptions } from '@/common/constants';
import { EEmpty, EFormat } from '@/common/enums';
import { TUser } from '@/common/models';
import { Paths } from '@/pages/routers';
import { getFullUrlStatics, formatISODateToDateTime } from '@/utils/functions';
import Avatar from '@/components/Avatar';
import { EGetPlayersAction, getPlayersAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { TGetPlayersParams } from '@/services/api';
import Status from '@/components/Status';

import { TPlayersTableProps } from './PlayersTable.types';

const PlayersTable: React.FC<TPlayersTableProps> = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getPlayersLoading = useSelector((state: TRootState) => state.loadingReducer[EGetPlayersAction.GET_PLAYERS]);
  const playersState = useSelector((state: TRootState) => state.playerReducer.getPlayersResponse)?.data;

  const [getPlayersParamsRequest, setGetPlayersParamsRequest] = useState<TGetPlayersParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    classIds: `${id}`,
  });

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetPlayersParamsRequest({
      ...getPlayersParamsRequest,
      page,
      size,
      sort,
    });
  };

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
        return (
          <div className="Table-info">
            <Link to={Paths.PlayerDetail(String(record?.id))} className="Table-info-title">
              {record?.name || EEmpty.DASH}
            </Link>
            <div className="Table-info-description">
              {record?.date_of_birth
                ? formatISODateToDateTime(record.date_of_birth, EFormat['DD/MM/YYYY'])
                : EEmpty.DASH}
            </div>
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
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      render: (_: string, record: TUser): React.ReactElement => {
        const status = dataAuditingStatusOptions.find((item) => item.value === record.auditing_status);
        return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : <>{EEmpty.DASH}</>;
      },
    },
  ];

  const getPlayers = useCallback(() => {
    dispatch(getPlayersAction.request({ params: getPlayersParamsRequest, headers: { branchIds: currentBranchId } }));
  }, [dispatch, getPlayersParamsRequest, currentBranchId]);

  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

  return (
    <div className="PlayersTable">
      <Table
        columns={columns}
        dataSources={playersState?.content || []}
        page={getPlayersParamsRequest?.page}
        pageSize={getPlayersParamsRequest?.size}
        total={playersState?.total_elements}
        loading={getPlayersLoading}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
};

export default PlayersTable;
