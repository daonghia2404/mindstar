import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Col, Row } from 'antd';
import moment, { Moment } from 'moment';

import Table from '@/components/Table';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataTypeCheckInOptions } from '@/common/constants';
import { EEmpty, EFormat, ETypeCheckIn } from '@/common/enums';
import { TAttendance } from '@/common/models';
import { formatISODateToDateTime } from '@/utils/functions';
import { EGetManagerAttendancesAction, getManagerAttendancesAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { TGetManagerAttendancesParams } from '@/services/api';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import DatePicker from '@/components/DatePicker';

import { TAttendancesTableProps } from './AttendancesTable.types';
import './AttendancesTable.scss';

const AttendancesTable: React.FC<TAttendancesTableProps> = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getManagerAttendancesLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetManagerAttendancesAction.GET_MANAGER_ATTENDANCES],
  );
  const attendancesState = useSelector(
    (state: TRootState) => state.attendanceReducer.getManagerAttendancesResponse,
  )?.data;

  const [getManagerAttendancesParamsRequest, setGetManagerAttendancesParamsRequest] =
    useState<TGetManagerAttendancesParams>({
      page: DEFAULT_PAGE,
      size: DEFAULT_PAGE_SIZE * 10,
      fromDate: moment().startOf('month')?.valueOf(),
      toDate: moment().endOf('month')?.valueOf(),
    });

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetManagerAttendancesParamsRequest({
      ...getManagerAttendancesParamsRequest,
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

  const getManagerAttendances = useCallback(() => {
    dispatch(
      getManagerAttendancesAction.request({
        paths: { id },
        params: getManagerAttendancesParamsRequest,
        headers: { branchIds: currentBranchId },
      }),
    );
  }, [dispatch, getManagerAttendancesParamsRequest, id, currentBranchId]);

  useEffect(() => {
    getManagerAttendances();
  }, [getManagerAttendances]);

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
                    <Icon name={EIconName.Briefcase} color={EIconColor.TUNDORA} />
                    Tổng Công: <strong>{0 || EEmpty.ZERO}</strong>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row gutter={[16, 16]}>
                <Col>
                  <DatePicker
                    value={moment(getManagerAttendancesParamsRequest.fromDate)}
                    label="Tháng"
                    picker="month"
                    format={EFormat['MM/YYYY']}
                    placeholder=" "
                    onChange={(data: Moment): void => {
                      setGetManagerAttendancesParamsRequest({
                        ...getManagerAttendancesParamsRequest,
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
        page={getManagerAttendancesParamsRequest?.page}
        pageSize={getManagerAttendancesParamsRequest?.size}
        total={attendancesState?.total_elements}
        loading={getManagerAttendancesLoading}
        onPaginationChange={handlePaginationChange}
        showPagination={false}
      />
    </div>
  );
};

export default AttendancesTable;
