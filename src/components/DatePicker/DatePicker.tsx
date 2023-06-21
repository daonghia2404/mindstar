import React, { useRef, useState } from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import classNames from 'classnames';
import vi from 'antd/es/date-picker/locale/vi_VN';

import { EFormat } from '@/common/enums';
import FormField from '@/components/FormField';
import Icon, { EIconColor, EIconName } from '@/components/Icon';

import { TDatePickerProps } from './DatePicker.types';
import './DatePicker.scss';

const DatePicker: React.FC<TDatePickerProps> = ({
  allowEmpty,
  className,
  value,
  placeholder,
  disabled,
  label,
  required,
  size,
  active,
  style,
  allowClear = false,
  format,
  showNow,
  showTime,
  picker,
  range,
  disabledDate,
  onChange,
}) => {
  const ref = useRef(null);
  const [focused, setFocused] = useState<boolean>(false);

  const handleFocus = (): void => {
    setFocused(true);
  };

  const handleBlur = (): void => {
    setFocused(false);
  };

  const props = {
    ref,
    dropdownClassName: 'DatePicker-dropdown',
    open: focused,
    onOpenChange: setFocused,
    format: format || EFormat['DD/MM/YYYY'],
    value,
    picker,
    showNow,
    locale: {
      ...vi,
      lang: {
        ...vi.lang,
        ok: 'Chọn',
      },
    },
    allowClear: false,
    inputReadOnly: true,
    clearIcon: <Icon name={EIconName.X} color={EIconColor.DOVE_GRAY} />,
    placeholder,
    onChange,
    disabledDate,
    suffixIcon: <></>,
    onFocus: handleFocus,
    showTime,
    getPopupContainer: (trigger: HTMLElement): HTMLElement => trigger,
  };

  return (
    <FormField
      label={label}
      required={required}
      size={size}
      className={classNames('DatePicker', className)}
      focused={focused}
      active={active || focused || Boolean(value)}
      suffixIcon={
        allowClear && value ? (
          <Icon
            className="cursor-pointer"
            name={EIconName.X}
            color={EIconColor.TUNDORA}
            onClick={(): void => {
              onChange?.(undefined);
              handleBlur();
            }}
          />
        ) : (
          <Icon name={EIconName.Calendar} color={EIconColor.TUNDORA} />
        )
      }
      disabled={disabled}
      style={style}
      onClick={handleFocus}
    >
      {range ? <AntdDatePicker.RangePicker {...props} allowEmpty={allowEmpty} /> : <AntdDatePicker {...props} />}
    </FormField>
  );
};

export default DatePicker;
