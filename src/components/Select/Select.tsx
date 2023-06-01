import React, { useEffect, useRef, useState } from 'react';
import { Input, InputRef } from 'antd';
import classNames from 'classnames';

import { searchString } from '@/utils/functions';
import { useDebounce } from '@/utils/hooks';
import { ETimeoutDebounce } from '@/common/enums';
import WrapperLazyLoad from '@/components/WrapperLazyLoad';
import FormField from '@/components/FormField';
import DropdownCustom from '@/components/DropdownCustom';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Empty from '@/components/Empty';

import { TSelectOption, TSelectProps } from './Select.types';
import './Select.scss';

const Select: React.FC<TSelectProps> = ({
  disabled,
  options = [],
  showSearch,
  value,
  className,
  allowClear,
  label,
  required,
  size,
  placement,
  active,
  placeholder,
  readonly,
  style,
  onSearch,
  onLoadMore,
  onChange,
}) => {
  const ref = useRef<InputRef>(null);
  const [focused, setFocused] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const searchValueDebounce = useDebounce(keyword, ETimeoutDebounce.SEARCH);

  const filterOptions = showSearch && !onSearch ? options.filter((item) => searchString(item.label, keyword)) : options;

  const handleSearch = (keywordValue: string): void => {
    setKeyword(keywordValue);
  };

  const handleFocus = (): void => {
    if (!readonly) {
      ref.current?.focus();
      setFocused(true);
    }
  };

  const handleBlur = (): void => {
    ref.current?.blur();
    setFocused(false);
  };

  const handleLoadMore = (): void => {
    onLoadMore?.();
    // if (onLoadMore && paginate) {
    //   const isLoadMore = paginate.page < getTotalPage(paginate.total, paginate.pageSize);
    //   if (isLoadMore) {
    //   }
    // }
  };

  const handleChange = (data: TSelectOption): void => {
    onChange?.(data);
    handleBlur();
  };

  const renderSelectDropdown = (): React.ReactElement => {
    const isEmpty = filterOptions.length === 0;
    return (
      <div className="Select-dropdown">
        {isEmpty ? (
          <Empty />
        ) : (
          <WrapperLazyLoad maxHeight={256} onEnd={handleLoadMore}>
            {filterOptions.map((item) => (
              <div
                key={item.value}
                className={classNames('Select-dropdown-item', { active: item.value === value?.value })}
                onClick={(): void => handleChange(item)}
              >
                {item.label}
              </div>
            ))}
          </WrapperLazyLoad>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (isMounted && onSearch) {
      onSearch?.(searchValueDebounce);
    }

    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValueDebounce]);

  useEffect(() => {
    if (!focused) {
      setKeyword('');
    }
  }, [focused]);

  return (
    <FormField
      label={label}
      required={required}
      size={size}
      className={classNames('Select', className)}
      focused={focused}
      active={active || focused || !['undefined', 'null'].includes(typeof value?.value)}
      onClick={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      readonly={readonly}
      style={style}
      suffixIcon={
        allowClear && value?.value ? (
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
          <Icon name={EIconName.AngleDown} color={EIconColor.TUNDORA} />
        )
      }
    >
      <DropdownCustom
        visible={focused}
        overlay={renderSelectDropdown()}
        getPopupContainer={(trigger): HTMLElement => trigger}
        disabled={disabled}
        placement={placement}
      >
        {!keyword && (
          <span className={classNames('Select-show-value FormField-show-value', { blur: showSearch && focused })}>
            {value?.label}
          </span>
        )}
        <Input
          className={classNames('Select-show-search')}
          ref={ref}
          value={keyword}
          readOnly={!showSearch || readonly}
          placeholder={(!value?.label && focused) || (!value?.label && active) ? placeholder : undefined}
          onFocus={handleFocus}
          onChange={(e): void => handleSearch(e.target.value)}
        />
      </DropdownCustom>
    </FormField>
  );
};

export default Select;
