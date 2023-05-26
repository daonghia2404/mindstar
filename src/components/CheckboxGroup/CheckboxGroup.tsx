import React from 'react';
import { Space } from 'antd';

import FormField from '@/components/FormField';
import Checkbox from '@/components/Checkbox/Checkbox';
import { TSelectOption } from '@/components/Select';

import { TCheckboxGroupProps } from './CheckboxGroup.types.d';
import './CheckboxGroup.scss';

const CheckboxGroup: React.FC<TCheckboxGroupProps> = ({ label, size, required, value, options = [], onChange }) => {
  const handleChange = (checked: boolean, data: TSelectOption): void => {
    if (checked) {
      const newData = [...(value || []), data];
      onChange?.(newData);
    } else {
      const newData = value?.filter((item) => item.value !== data?.value) || [];
      onChange?.(newData);
    }
  };

  return (
    <FormField label={label} active size={size} required={required} className="CheckboxGroup">
      <Space direction="vertical" size={[16, 8]}>
        {options.map((item) => {
          const isChecked = value?.map((option) => option.value).includes(item.value);
          return (
            <Checkbox
              label={item.label}
              size="large"
              value={isChecked}
              onChange={(checked): void => handleChange(checked, item)}
            />
          );
        })}
      </Space>
    </FormField>
  );
};

export default CheckboxGroup;
