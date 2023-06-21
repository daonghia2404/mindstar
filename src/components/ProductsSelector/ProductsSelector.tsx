import React from 'react';
import { Col, Row } from 'antd';

import FormField from '@/components/FormField';
import Table from '@/components/Table';
import { EGetProductsAction, getProductsAction } from '@/redux/actions';
import Input from '@/components/Input';
import { EIconColor, EIconName } from '@/components/Icon';
import Select from '@/components/Select';
import { useOptionsPaginate } from '@/utils/hooks';
import { EEmpty } from '@/common/enums';
import { TProduct } from '@/common/models';
import { formatCurrency, getFullUrlStatics } from '@/utils/functions';
import Avatar from '@/components/Avatar';
import Button, { EButtonStyleType } from '@/components/Button';

import { TProductsSelectorProps } from './ProductsSelector.types.d';
import './ProductsSelector.scss';

const ProductsSelector: React.FC<TProductsSelectorProps> = ({ label, required, value = [], onChange }) => {
  const {
    options: optionsProducts,
    handleLoadMore: handleLoadMoreProducts,
    handleSearch: handleSearchProducts,
  } = useOptionsPaginate(
    getProductsAction,
    'productReducer',
    'getProductsResponse',
    EGetProductsAction.GET_PRODUCTS,
    'search',
    {},
  );

  const handleSelectProduct = (data: TProduct): void => {
    const isExisted = value.map((item) => item.value).includes(data?.id);

    if (isExisted) {
      const newData = value?.map((item) => {
        if (item.value === data.id) {
          return {
            ...item,
            quantity: (item?.quantity || 0) + 1,
          };
        }
        return item;
      });
      onChange?.(newData);
    } else {
      const newData = [...value, { label: data?.name, value: data.id, data, quantity: 1 }];
      onChange?.(newData);
    }
  };

  const handleRemoveProduct = (data: TProduct): void => {
    const newData = value.filter((item) => item.value !== (data?.product_id || data.id));
    onChange?.(newData);
  };

  const handleChangeQuantity = (quantity: number, data: TProduct): void => {
    const newData = value?.map((item) => {
      if (item.value === (data?.product_id || data.id)) {
        return {
          ...item,
          quantity,
        };
      }
      return item;
    });

    onChange?.(newData);
  };

  const columns = [
    {
      key: 'image',
      dataIndex: 'image',
      title: 'Ảnh',
      width: 72,
      render: (_: string, record: TProduct): React.ReactElement => (
        <div className="Table-image">
          <Avatar
            size={72}
            image={getFullUrlStatics(record.image || record?.product_image_path)}
            defaultImage
            shape="square"
          />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      className: 'limit-width',
      render: (_: string, record: TProduct): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title ellipsis-2">{record?.name || record?.product_name || EEmpty.DASH}</div>
            <div className="Table-info-description" style={{ color: EIconColor.PURPLE_HEART }}>
              {record?.code || EEmpty.DASH}
            </div>
            <div className="Table-info-description word-break-all ellipsis-2" style={{ marginTop: 0 }}>
              {record?.description || EEmpty.DASH}
            </div>
          </div>
        );
      },
    },
    {
      key: 'price',
      dataIndex: 'price',
      title: 'Giá',
      className: 'nowrap',
      render: (_: string, record: TProduct): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">
            {formatCurrency({ amount: record?.selling_price || record?.amount, showSuffix: true })}
          </div>
          {record?.retail_price && (
            <del className="Table-info-description">
              {formatCurrency({ amount: record?.retail_price, showSuffix: true })}
            </del>
          )}
        </div>
      ),
    },
    {
      key: 'quantity',
      dataIndex: 'quantity',
      title: 'Số lượng',
      width: 120,
      className: 'limit-width',
      render: (_: string, record: TProduct): React.ReactElement => {
        const target = value?.find((item) => item.value === (record.product_id || record.id));

        return (
          <Input
            label="Số lượng"
            value={typeof target?.quantity === 'number' ? String(target?.quantity) : undefined}
            numberic
            useNumber
            placeholder="Nhập dữ liệu"
            disabled={!target}
            onChange={(quantity): void => handleChangeQuantity(Number(quantity), record)}
          />
        );
      },
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TProduct): React.ReactElement => (
        <div onClick={(e): void => e.stopPropagation()}>
          <Button
            iconName={EIconName.Trash}
            iconColor={EIconColor.BLACK}
            size="small"
            styleType={EButtonStyleType.GENERAL_FORM}
            onClick={(): void => handleRemoveProduct(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <FormField label={label} required={required} className="ProductsSelector">
      <Table
        useCardResponsive={false}
        showTable={value.length > 0}
        header={
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Select
                label="Tìm kiếm sản phẩm"
                placeholder="Chọn dữ liệu"
                value={undefined}
                showSearch
                options={optionsProducts}
                onLoadMore={handleLoadMoreProducts}
                onSearch={handleSearchProducts}
                onChange={(option): void => {
                  handleSelectProduct(option?.data);
                }}
              />
            </Col>
          </Row>
        }
        columns={columns}
        scroll={{ y: 97 * 5 }}
        dataSources={value?.map((item) => item.data)}
        showPagination={false}
      />
    </FormField>
  );
};

export default ProductsSelector;
