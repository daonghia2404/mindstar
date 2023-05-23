import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Input as AntdInput, InputRef } from 'antd';

import { TInputProps } from '@/components/Input/Input.types';
import { formatNumberWithCommas } from '@/utils/functions';
import FormField from '@/components/FormField';
import { ETimeoutDebounce } from '@/common/enums';
import { useDebounce } from '@/utils/hooks';

import './Input.scss';

const Input: React.FC<TInputProps> = ({
  className,
  type,
  size,
  value,
  label,
  required,
  numberic,
  useNumber,
  disabled,
  useComma,
  suffixIcon,
  suffixText,
  style,
  active,
  placeholder,
  onSearch,
  onChange,
  onEnter,
}) => {
  const ref = useRef<InputRef>(null);
  const [focused, setFocused] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const searchValueDebounce = useDebounce(keyword, ETimeoutDebounce.SEARCH);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value: changedValue } = e.target;
    setKeyword(changedValue);

    if (numberic) {
      const reg = /^-?\d*(\d*)?$/;
      const isNumbericPass = reg.test(changedValue) || changedValue === '';

      if (useNumber) {
        if (changedValue === '') {
          onChange?.('');
        } else if (useComma) {
          onChange?.(Number(changedValue?.replaceAll(/[.,\s]/g, '')) || '');
        } else {
          onChange?.(isNumbericPass ? Number(changedValue) : Number(value) || '');
        }
      } else {
        onChange?.(isNumbericPass ? String(changedValue || '') : String(value || '') || '');
      }
    } else {
      onChange?.(changedValue);
    }
  };

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      onEnter?.();
    }
  };

  const handleFocus = (): void => {
    ref.current?.focus();
    setFocused(true);
  };

  const handleBlur = (): void => {
    ref.current?.blur();
    setFocused(false);
  };

  const commonProps = {
    ref,
    value: numberic && useComma && useNumber && value ? formatNumberWithCommas(Number(value || 0)) : value,
    disabled,
    placeholder,
    onChange: handleChange,
    onKeyDown: handleKeydown,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) onSearch?.(searchValueDebounce || undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValueDebounce]);

  return (
    <FormField
      label={label}
      required={required}
      size={size}
      className={classNames('Input', className)}
      focused={focused}
      active={active || focused || Boolean(value)}
      suffixIcon={suffixIcon}
      suffixText={suffixText}
      disabled={disabled}
      style={style}
      onClick={handleFocus}
      onBlur={handleBlur}
    >
      {type === 'password' ? <AntdInput.Password {...commonProps} /> : <AntdInput {...commonProps} />}
    </FormField>
  );
};

export default Input;
