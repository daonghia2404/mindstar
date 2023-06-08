import React from 'react';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import classNames from 'classnames';
import vi from 'antd/es/date-picker/locale/vi_VN';

import { dataDayOfWeeksOptions } from '@/common/constants';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { EFormat } from '@/common/enums';
import { TSelectOption } from '@/components/Select';
import FormField from '@/components/FormField';

import { defaultWorkingTimesEnd, defaultWorkingTimesStart } from './WorkingTimes.data';
import { TWorkingTimesProps } from './WorkingTimes.types.d';
import './WorkingTimes.scss';

const { RangePicker } = DatePicker;

const WorkingTimes: React.FC<TWorkingTimesProps> = ({
  value = [],
  label,
  size,
  required,
  showTime = true,
  onChange,
}) => {
  const handleToggleDayOfWeek = (data: TSelectOption): void => {
    const isExisted = value.find((item) => item.dayOfWeek === data.value);
    if (isExisted) {
      const newData = value.filter((item) => item.dayOfWeek !== data.value);
      onChange?.(newData);
    } else {
      const newData = [
        ...value,
        {
          dayOfWeek: String(data.value),
          startTime: defaultWorkingTimesStart,
          endTime: defaultWorkingTimesEnd,
        },
      ];
      onChange?.(newData);
    }
  };

  const handleChangeTimes = (
    values: [Moment | null, Moment | null] | null,
    formatString: [string, string],
    data: TSelectOption,
  ): void => {
    const newData = value.map((item) => {
      if (item.dayOfWeek === data.value) {
        const [startTime, endTime] = formatString;
        return {
          ...item,
          startTime: `${startTime}:00`,
          endTime: `${endTime}:00`,
        };
      }
      return item;
    });

    onChange?.(newData);
  };

  return (
    <FormField className="WorkingTimes" label={label} size={size} active required={required}>
      <div className="WorkingTimes-day-of-week flex">
        {dataDayOfWeeksOptions.map((item) => (
          <div
            key={item.value}
            className={classNames('WorkingTimes-day-of-week-item flex items-center justify-center text-center', {
              active: value.find((workTime) => workTime.dayOfWeek === item.value),
            })}
            onClick={(): void => handleToggleDayOfWeek(item)}
          >
            {item.label}
          </div>
        ))}
      </div>

      {showTime && (
        <div className="WorkingTimes-times">
          {dataDayOfWeeksOptions.map((item) => {
            const workTimeData = value.find((workTime) => workTime.dayOfWeek === item.value);
            if (!workTimeData) return <></>;

            const startTime = workTimeData.startTime ? moment(workTimeData.startTime, EFormat['HH:mm:ss']) : undefined;
            const endTime = workTimeData.endTime ? moment(workTimeData.endTime, EFormat['HH:mm:ss']) : undefined;
            const isValidValue = startTime && endTime;

            return (
              <div key={item.value} className="WorkingTimes-times-item flex items-center">
                <span className="WorkingTimes-times-item-label">{item.label}:</span>
                <div className="WorkingTimes-times-item-picker">
                  <RangePicker
                    format={EFormat['HH:mm']}
                    value={isValidValue ? [startTime, endTime] : undefined}
                    picker="time"
                    allowClear={false}
                    allowEmpty={[false, false]}
                    locale={{
                      ...vi,
                      lang: {
                        ...vi.lang,
                        ok: 'Chọn',
                      },
                    }}
                    dropdownClassName="WorkingTimes-times-item-picker-dropdown"
                    onChange={(values, formatString): void => handleChangeTimes(values, formatString, item)}
                    suffixIcon={<Icon name={EIconName.Clock} color={EIconColor.DOVE_GRAY} />}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </FormField>
  );
};

export default WorkingTimes;
