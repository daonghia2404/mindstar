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
import { TSelectOption } from '@/components/Select';

import { TMultipleSelectProps } from './MultipleSelect.types';
import './MultipleSelect.scss';

const MultipleSelect: React.FC<TMultipleSelectProps> = ({
  disabled,
  options = [],
  showSearch,
  value,
  className,
  label,
  required,
  size,
  placement,
  active,
  placeholder,
  allowClear,
  onSearch,
  onLoadMore,
  onChange,
}) => {
  const ref = useRef<InputRef>(null);
  const [focused, setFocused] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const searchValueDebounce = useDebounce(keyword, ETimeoutDebounce.SEARCH);
  const isExistedValue = value && value.length > 0;

  const filterOptions = showSearch && !onSearch ? options.filter((item) => searchString(item.label, keyword)) : options;

  const handleSearch = (keywordValue: string): void => {
    setKeyword(keywordValue);
  };

  const handleFocus = (): void => {
    ref.current?.focus();
    setFocused(true);
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

  const handleChange = (checked: boolean, data: TSelectOption): void => {
    if (checked) {
      const newData = value?.filter((item) => item.value !== data.value);
      onChange?.(newData);
    } else {
      const newData = [...(value || []), data];
      onChange?.(newData);
    }
  };

  const renderMultipleSelectDropdown = (): React.ReactElement => {
    const isEmpty = filterOptions.length === 0;
    return (
      <div className="MultipleSelect-dropdown">
        {isEmpty ? (
          <Empty />
        ) : (
          <WrapperLazyLoad maxHeight={256} onEnd={handleLoadMore}>
            {filterOptions.map((item) => {
              const isChecked = value?.map((option) => option.value).includes(item.value);
              return (
                <div
                  key={item.value}
                  className={classNames('MultipleSelect-dropdown-item flex items-center justify-between', {
                    active: isChecked,
                  })}
                  onClick={(): void => handleChange(Boolean(isChecked), item)}
                >
                  {item.label}
                  {isChecked && <Icon name={EIconName.Check} color={EIconColor.PURPLE_HEART} />}
                </div>
              );
            })}
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
      className={classNames('MultipleSelect', className)}
      focused={focused}
      active={active || focused || isExistedValue}
      onClick={handleFocus}
      disabled={disabled}
      suffixIcon={
        allowClear && isExistedValue ? (
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
        overlay={renderMultipleSelectDropdown()}
        getPopupContainer={(trigger): HTMLElement => trigger}
        disabled={disabled}
        placement={placement}
        onVisibleChange={(): void => handleBlur()}
      >
        {!keyword && (
          <span
            className={classNames('FormField-show-value MultipleSelect-show-value', { blur: showSearch && focused })}
          >
            {value?.map((item) => item.label)?.join(', ')}
          </span>
        )}
        <Input
          className={classNames('MultipleSelect-show-search', { 'pointer-events-none': !focused })}
          ref={ref}
          value={keyword}
          readOnly={!showSearch}
          placeholder={!isExistedValue ? placeholder : undefined}
          onFocus={handleFocus}
          onChange={(e): void => handleSearch(e.target.value)}
        />
      </DropdownCustom>
    </FormField>
  );
};

export default MultipleSelect;
