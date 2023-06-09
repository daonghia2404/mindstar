import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import moment, { Moment } from 'moment';
import _ from 'lodash';
import { navigate } from '@reach/router';
import classNames from 'classnames';

import { TRootState } from '@/redux/reducers';
import Card from '@/components/Card';
import { TGetSchedulesParams } from '@/services/api';
import DatePicker from '@/components/DatePicker';
import { EGetSchedulesAction, getSchedulesAction } from '@/redux/actions';
import { EEmpty, EFormat } from '@/common/enums';
import Table, { TTableColumn } from '@/components/Table';
import { capitalizeFirstLetter, formatISODateToDateTime, getRangeMomentBetweenTwoDate } from '@/utils/functions';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { TSchedule } from '@/common/models';
import Tags from '@/components/Tags';
import { Paths } from '@/pages/routers';

import './Schedules.scss';

const Schedules: React.FC = () => {
  const dispatch = useDispatch();

  const [getSchedulesParamsRequest, setGetSchedulesParamsRequest] = useState<TGetSchedulesParams>({
    fromDate: moment().startOf('week').valueOf(),
    toDate: moment().endOf('week').valueOf(),
  });
  const schedulesState = useSelector((state: TRootState) => state.scheduleReducer.getSchedulesResponse)?.data;

  const schedulesData = schedulesState?.content
    ?.filter((item) => item.at_time && item.at_eras)
    ?.map((item) => ({ ...item, orderValue: moment(item.at_time).format('HH') }));

  const parseScheduleOrder = _.orderBy(schedulesData, ['orderValue'], 'asc');

  const parseSchedulesGroup = _.groupBy(
    parseScheduleOrder?.map((item) => {
      const startTime = formatISODateToDateTime(item.at_time, EFormat['HH:mm']);
      const endTime = formatISODateToDateTime(item.at_time + item.duration_in_second * 1000, EFormat['HH:mm']);

      return {
        ...item,
        totalTime: `${startTime}-${endTime}`,
      };
    }) || [],
    'totalTime',
  );

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
        const isSameDayOfWeek = moment().day() === item.day();

        return {
          key: String(dayOfWeek),
          dataIndex: String(dayOfWeek),
          title: capitalizeFirstLetter(formatISODateToDateTime(valueOf, EFormat['dddd, DD'])),
          className: classNames('text-center limit-width', { 'hightlight': isSameDayOfWeek }),
          render: (value: any): React.ReactElement => {
            const dataSchedules: TSchedule[] = value;
            const isEmpty = dataSchedules.length === 0;
            return isEmpty ? (
              <>{EEmpty.DASH}</>
            ) : (
              <Tags
                className="justify-center"
                options={dataSchedules?.map((schedule) => {
                  return {
                    value: String(schedule?.class?.id),
                    label: schedule?.class?.name,
                    data: {
                      iconName: EIconName.ChalkBoard,
                    },
                    onClick: (): void => {
                      navigate(Paths.ClassDetail(String(schedule?.class?.id)));
                    },
                  };
                })}
              />
            );
          },
        };
      });
      return [
        {
          key: 'time',
          dataIndex: 'time',
          title: 'Thời gian',
          className: 'nowrap text-center',
          fixed: true,
        },
        ...columnsByWeek,
      ];
    }

    return [];
  };

  const dataSources = Object.keys(parseSchedulesGroup)?.map((item) => {
    const dataMatch = (dayOfWeekMatch: string): TSchedule[] =>
      parseSchedulesGroup[item]?.filter((subItem) => subItem.at_eras.split(',').includes(dayOfWeekMatch));

    return {
      time: item,
      '1': dataMatch('1'),
      '2': dataMatch('2'),
      '3': dataMatch('3'),
      '4': dataMatch('4'),
      '5': dataMatch('5'),
      '6': dataMatch('6'),
      '7': dataMatch('7'),
    };
  });

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
            <Table
              useCardResponsive={false}
              rowClassName={(record): string | undefined => {
                const [fromDate, toDate] = record.time.split('-');
                const parseFromDate = moment(fromDate, EFormat['HH:mm']).valueOf();
                const parseToDate = moment(toDate, EFormat['HH:mm']).valueOf();
                const isSameTimeOfDay = moment().valueOf() >= parseFromDate && moment().valueOf() <= parseToDate;
                return isSameTimeOfDay ? `hightlight` : undefined;
              }}
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.Calendar} color={EIconColor.TUNDORA} />
                      Tổng Lịch Học: <strong>{schedulesState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                </Row>
              }
              columns={columns()}
              dataSources={dataSources}
              loading={getSchedulesLoading}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Schedules;
