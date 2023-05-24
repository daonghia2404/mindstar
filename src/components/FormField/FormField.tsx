import React from 'react';
import classNames from 'classnames';

import { TFormFieldProps } from './FormField.types.d';
import './FormField.scss';

const FormField: React.FC<TFormFieldProps> = ({
  className,
  label,
  required,
  size = 'middle',
  focused,
  active,
  children,
  suffixIcon,
  suffixText,
  disabled,
  style,
  readOnlyText,
  onClick,
  onBlur,
}) => {
  return (
    <div
      className={classNames('FormField flex items-end', className, size, {
        active,
        focused,
        disabled,
        'readonly-text': readOnlyText,
        'suffix-visible': suffixText,
      })}
      onClick={(): void => {
        if (!disabled && !focused) {
          onClick?.();
        }
      }}
      onBlur={(): void => {
        if (!disabled && focused) {
          setTimeout(() => {
            onBlur?.();
          }, 100);
        }
      }}
      style={style}
    >
      <div className="FormField-label">
        {label}
        {required && <span>*</span>}
      </div>
      <div className="FormField-field">{children}</div>

      {suffixIcon && <div className="FormField-suffix-icon">{suffixIcon}</div>}
      {suffixText && <div className="FormField-suffix-text">{suffixText}</div>}
    </div>
  );
};

export default FormField;
