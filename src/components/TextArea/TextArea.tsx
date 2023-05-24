import React, { useRef, useState } from 'react';
import classNames from 'classnames';

import { Input } from 'antd';
import { TextAreaRef } from 'antd/lib/input/TextArea';
import FormField from '@/components/FormField';

import { TTextAreaProps } from './TextArea.types';
import './TextArea.scss';

const { TextArea: AntdTextArea } = Input;

const TextArea: React.FC<TTextAreaProps> = ({
  className,
  size,
  label,
  required,
  active,
  suffixIcon,
  suffixText,
  disabled,
  style,
  placeholder,
  value,
  onChange,
}) => {
  const ref = useRef<TextAreaRef>(null);
  const [focused, setFocused] = useState<boolean>(false);

  const handleFocus = (): void => {
    ref.current?.focus();
    setFocused(true);
  };

  const handleBlur = (): void => {
    ref.current?.blur();
    setFocused(false);
  };

  return (
    <FormField
      label={label}
      required={required}
      size={size}
      className={classNames('TextArea', className)}
      focused={focused}
      active={active || focused || Boolean(value)}
      suffixIcon={suffixIcon}
      suffixText={suffixText}
      disabled={disabled}
      style={style}
      onClick={handleFocus}
      onBlur={handleBlur}
    >
      <AntdTextArea
        ref={ref}
        size={size}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </FormField>
  );
};

export default TextArea;
