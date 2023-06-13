import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import Card from '@/components/Card';
import Carousels from '@/components/Carousels';
import { EIconName } from '@/components/Icon';
import { TRootState } from '@/redux/reducers';
import {
  convertDaysOfWeek,
  formatISODateToDateTime,
  getDatesFromTodayToNumberDay,
  getRangeMomentBetweenTwoDate,
} from '@/utils/functions';
import { EEmpty, EFormat } from '@/common/enums';
import Empty from '@/components/Empty';
import { Paths } from '@/pages/routers';

import { TWeeklyScheduleProps } from './WeeklySchedule.types';
import './WeeklySchedule.scss';

const WeeklySchedule: React.FC<TWeeklyScheduleProps> = () => {
  const scheduleState = useSelector((state: TRootState) => state.scheduleReducer.getSchedulesResponse)?.data;
  const isEmpty = scheduleState?.content?.length === 0;
  const dataDates = getDatesFromTodayToNumberDay(10);

  return (
    <Card
      className="WeeklySchedule"
      title="Lịch học trong tuần"
      suffixLink={{ icon: EIconName.ArrowLongRight, link: Paths.Schedules }}
    >
      <div className="WeeklySchedule-wrapper">
        {isEmpty ? (
          <Empty />
        ) : (
          <Carousels arrows={false} dots={false} infinite={false} autoplay={false} variableWidth>
            {dataDates?.map((day) =>
              scheduleState?.content
                ?.map((schedule) => {
                  if (schedule.event?.id) {
                    const arrRange = getRangeMomentBetweenTwoDate(
                      schedule.event.start_date_time,
                      schedule.event.end_date_time,
                    );
                    const daysOfWeek = arrRange
                      .map((date) => (moment(date).day() === 0 ? 7 : moment(date).day()))
                      ?.join(',');

                    return {
                      ...schedule,
                      at_eras: daysOfWeek,
                    };
                  }

                  return schedule;
                })
                .filter((schedule) => convertDaysOfWeek(schedule.at_eras).includes(String(moment(day).days())))
                .map((item) => {
                  return (
                    <div key={item.id} className="WeeklySchedule-item">
                      <div className="WeeklySchedule-item-header">
                        {formatISODateToDateTime(day, EFormat['dddd, DD'])}
                      </div>
                      <div className="WeeklySchedule-item-body">
                        <p>{item.event?.title || item.class?.name || EEmpty.DASH}</p>
                        <p>
                          {formatISODateToDateTime(item.at_time, EFormat['HH:mm'])} -{' '}
                          {formatISODateToDateTime(item.at_time + item.duration_in_second * 1000, EFormat['HH:mm'])}
                        </p>
                      </div>
                    </div>
                  );
                }),
            )}
          </Carousels>
        )}
      </div>
    </Card>
  );
};

export default WeeklySchedule;
