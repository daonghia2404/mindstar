import React from 'react';
import { Pagination as AntdPagination } from 'antd';
import classNames from 'classnames';
import Button, { EButtonStyleType } from '@/components/Button';
import { EIconColor, EIconName } from '@/components/Icon';

import { TPaginationProps } from '@/components/Pagination/Pagination.types';

import './Pagination.scss';

const Pagination: React.FC<TPaginationProps> = ({ page, pageSize, total = 0, className, onChange }) => {
  const itemRender = (
    currentPage: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: React.ReactNode,
  ): React.ReactNode => {
    switch (type) {
      case 'prev':
        return (
          <Button
            iconName={EIconName.AngleLeft}
            iconColor={EIconColor.DOVE_GRAY}
            size="small"
            styleType={EButtonStyleType.GENERAL_FORM}
          />
        );
      case 'next':
        return (
          <Button
            iconName={EIconName.AngleRight}
            iconColor={EIconColor.DOVE_GRAY}
            size="small"
            styleType={EButtonStyleType.GENERAL_FORM}
          />
        );
      default:
        return originalElement;
    }
  };

  return (
    <div className={classNames('Pagination', className)}>
      <AntdPagination
        current={page}
        pageSize={pageSize}
        total={total}
        hideOnSinglePage
        showLessItems
        showQuickJumper={false}
        showSizeChanger={false}
        itemRender={itemRender}
        onChange={onChange}
      />
    </div>
  );
};

export default Pagination;
