import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import moment, { Moment } from 'moment';
import _ from 'lodash';

import { TRootState } from '@/redux/reducers';
import Card from '@/components/Card';
import { TGetSchedulesParams } from '@/services/api';
import DatePicker from '@/components/DatePicker';
import { EGetSchedulesAction, getSchedulesAction } from '@/redux/actions';
import { EFormat } from '@/common/enums';
import Table, { TTableColumn } from '@/components/Table';
import { capitalizeFirstLetter, formatISODateToDateTime, getRangeMomentBetweenTwoDate } from '@/utils/functions';

import './Schedules.scss';

const Schedules: React.FC = () => {
  const dispatch = useDispatch();

  const [getSchedulesParamsRequest, setGetSchedulesParamsRequest] = useState<TGetSchedulesParams>({
    fromDate: moment().startOf('week').valueOf(),
    toDate: moment().endOf('week').valueOf(),
  });
  const schedulesState = useSelector(
    (state: TRootState) => state.scheduleReducer.getSchedulesResponse,
  )?.data?.content?.filter((item) => item.at_time);
  const parseScheduleOrder = _.orderBy(schedulesState, ['at_time'], 'asc');

  const parseSchedulesGroup = _.groupBy(
    parseScheduleOrder?.map((item) => {
      const startTime = formatISODateToDateTime(item.at_time, EFormat['HH:mm']);
      const endTime = formatISODateToDateTime(item.at_time + item.duration_in_second * 1000, EFormat['HH:mm']);

      return {
        ...item,
        totalTime: `${startTime} - ${endTime}`,
      };
    }) || [],
    'totalTime',
  );
  const parseSchedulesData = Object.keys(parseSchedulesGroup)?.map((item) => {
    return {
      time: item,
    };
  });

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getSchedulesLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetSchedulesAction.GET_SCHEDULES],
  );

  const columns = (): TTableColumn[] => {
    if (getSchedulesParamsRequest.fromDate && getSchedulesParamsRequest.toDate) {
      const columnsByWeek = getRangeMomentBetweenTwoDate(
        getSchedulesParamsRequest.fromDate,
        getSchedulesParamsRequest.toDate,
      )?.map((item) => {
        const valueOf = item.valueOf();
        const dayOfWeek = item.day() === 0 ? 7 : item.day();

        return {
          key: String(dayOfWeek),
          dataIndex: String(dayOfWeek),
          title: capitalizeFirstLetter(formatISODateToDateTime(valueOf, EFormat['dddd, DD'])),
        };
      });
      return [
        {
          key: 'time',
          dataIndex: 'time',
          title: 'Thời gian',
        },
        ...columnsByWeek,
      ];
    }

    return [];
  };

  const getSchedules = useCallback(() => {
    dispatch(
      getSchedulesAction.request({ params: getSchedulesParamsRequest, headers: { branchIds: currentBranchId } }),
    );
  }, [dispatch, getSchedulesParamsRequest, currentBranchId]);

  useEffect(() => {
    getSchedules();
  }, [getSchedules]);

  return (
    <div className="Schedules">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Practices-filter">
            <Row gutter={[16, 16]} justify="space-between">
              <Col />
              <Col>
                <DatePicker
                  value={moment(getSchedulesParamsRequest.fromDate)}
                  label="Tuần"
                  picker="week"
                  format={EFormat['wo, YYYY']}
                  placeholder=" "
                  onChange={(data: Moment): void => {
                    setGetSchedulesParamsRequest({
                      ...getSchedulesParamsRequest,
                      fromDate: data?.clone()?.startOf('week')?.valueOf(),
                      toDate: data?.clone()?.endOf('week')?.valueOf(),
                    });
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Practices-table">
            <Table columns={columns()} dataSources={parseSchedulesData} loading={getSchedulesLoading} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Schedules;
