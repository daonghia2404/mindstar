import React from 'react';
import classNames from 'classnames';

import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { ETypeCheckIn } from '@/common/enums';

import { TAttendanceCheckboxProps } from './AttendanceCheckbox.types.d';
import './AttendanceCheckbox.scss';

const AttendanceCheckbox: React.FC<TAttendanceCheckboxProps> = ({ value, onChange }) => {
  const handleChange = (): void => {
    switch (value) {
      case ETypeCheckIn.PRESENT:
        onChange?.(ETypeCheckIn.ABSENT);
        break;
      case ETypeCheckIn.ABSENT:
        onChange?.(ETypeCheckIn.NONE);
        break;
      case ETypeCheckIn.NONE:
        onChange?.(ETypeCheckIn.PRESENT);
        break;
      default:
        onChange?.(ETypeCheckIn.PRESENT);
        break;
    }
  };

  return (
    <div
      className={classNames('AttendanceCheckbox', {
        'present': value === ETypeCheckIn.PRESENT,
        'absent': value === ETypeCheckIn.ABSENT,
      })}
      onClick={handleChange}
    >
      {value === ETypeCheckIn.PRESENT && <Icon name={EIconName.Check} color={EIconColor.WHITE} />}
      {value === ETypeCheckIn.ABSENT && <Icon name={EIconName.X} color={EIconColor.WHITE} />}
    </div>
  );
};

export default AttendanceCheckbox;
