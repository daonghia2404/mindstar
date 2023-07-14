import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Col, Row } from 'antd';
import moment, { Moment } from 'moment';

import { TAttendancesTableProps } from './AttendancesTable.types';
import Table from '@/components/Table';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataTypeCheckInOptions } from '@/common/constants';
import { EEmpty, EFormat, ETypeCheckIn } from '@/common/enums';
import { TAttendance } from '@/common/models';
import { formatISODateToDateTime } from '@/utils/functions';
import { EGetPlayerAttendancesAction, getPlayerAttendancesAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { TGetPlayerAttendancesParams } from '@/services/api';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import DatePicker from '@/components/DatePicker';

import './AttendancesTable.scss';

const AttendancesTable: React.FC<TAttendancesTableProps> = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getPlayerAttendancesLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetPlayerAttendancesAction.GET_PLAYER_ATTENDANCES],
  );
  const attendancesState = useSelector(
    (state: TRootState) => state.attendanceReducer.getPlayerAttendancesResponse,
  )?.data;

  const [getPlayerAttendancesParamsRequest, setGetPlayerAttendancesParamsRequest] =
    useState<TGetPlayerAttendancesParams>({
      page: DEFAULT_PAGE,
      size: DEFAULT_PAGE_SIZE * 10,
      fromDate: moment().startOf('month')?.valueOf(),
      toDate: moment().endOf('month')?.valueOf(),
    });

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetPlayerAttendancesParamsRequest({
      ...getPlayerAttendancesParamsRequest,
      page,
      size,
      sort,
    });
  };

  const columns = [
    {
      key: 'status',
      dataIndex: 'status',
      title: '',
      width: 48,
      render: (_: string, record: TAttendance): React.ReactElement => {
        const currentCheckIn = dataTypeCheckInOptions.find((item) => item.value === record.checked_in);
        return (
          <div
            className={classNames('AttendancesTable-circle', {
              'ABSENT': currentCheckIn?.value === ETypeCheckIn.ABSENT,
              'PRESENT': currentCheckIn?.value === ETypeCheckIn.PRESENT,
            })}
            style={{ borderColor: currentCheckIn?.data?.color }}
          >
            <Icon name={currentCheckIn?.data?.iconName} color={currentCheckIn?.data?.color} />
          </div>
        );
      },
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '',
      render: (_: string, record: TAttendance): React.ReactElement => {
        const currentCheckIn = dataTypeCheckInOptions.find((item) => item.value === record.checked_in);
        return (
          <div className="Table-info">
            <div className="Table-info-title" style={{ color: currentCheckIn?.data?.color }}>
              {currentCheckIn?.label}
            </div>
            <div className="Table-info-description text-capitalize">
              {record?.at_date
                ? formatISODateToDateTime(record.at_date, EFormat['dddd | DD/MM/YYYY - HH:mm'])
                : EEmpty.DASH}
            </div>
            <div className="Table-info-description">
              {record?.class?.class_name || EEmpty.DASH} - {record?.branch?.name || EEmpty.DASH}
            </div>
          </div>
        );
      },
    },
  ];

  const getPlayerAttendances = useCallback(() => {
    dispatch(
      getPlayerAttendancesAction.request({
        paths: { id },
        params: getPlayerAttendancesParamsRequest,
        headers: { branchIds: currentBranchId },
      }),
    );
  }, [dispatch, getPlayerAttendancesParamsRequest, id, currentBranchId]);

  useEffect(() => {
    getPlayerAttendances();
  }, [getPlayerAttendances]);

  return (
    <div className="AttendancesTable">
      <Table
        scroll={{ y: 92 * 5 }}
        header={
          <Row gutter={[16, 16]} justify="space-between" align="middle" wrap={false}>
            <Col>
              <Row gutter={[24, 16]}>
                <Col>
                  <div className="Table-total-item nowrap">
                    <Icon name={EIconName.UserCheck} color={EIconColor.TUNDORA} />
                    Có mặt:{' '}
                    <strong>
                      {0 || EEmpty.ZERO} / {0 || EEmpty.ZERO}
                    </strong>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row gutter={[16, 16]}>
                <Col>
                  <DatePicker
                    value={moment(getPlayerAttendancesParamsRequest.fromDate)}
                    label="Tháng"
                    picker="month"
                    format={EFormat['MM/YYYY']}
                    placeholder=" "
                    onChange={(data: Moment): void => {
                      setGetPlayerAttendancesParamsRequest({
                        ...getPlayerAttendancesParamsRequest,
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
        }
        useCardResponsive={false}
        columns={columns}
        dataSources={attendancesState?.content || []}
        page={getPlayerAttendancesParamsRequest?.page}
        pageSize={getPlayerAttendancesParamsRequest?.size}
        total={attendancesState?.total_elements}
        loading={getPlayerAttendancesLoading}
        onPaginationChange={handlePaginationChange}
        showPagination={false}
      />
    </div>
  );
};

export default AttendancesTable;
