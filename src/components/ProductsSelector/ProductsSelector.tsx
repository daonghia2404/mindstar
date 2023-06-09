import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';

import FormField from '@/components/FormField';
import Table from '@/components/Table';
import { TRootState } from '@/redux/reducers';
import { EGetCategoriesAction, EGetProductsAction, getCategoriesAction, getProductsAction } from '@/redux/actions';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { TGetProductsParams } from '@/services/api';
import Input from '@/components/Input';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Select, { TSelectOption } from '@/components/Select';
import { useOptionsPaginate } from '@/utils/hooks';
import { EAuditingStatus, EEmpty } from '@/common/enums';
import { TProduct } from '@/common/models';
import { formatCurrency, getFullUrlStatics } from '@/utils/functions';
import Avatar from '@/components/Avatar';
import Checkbox from '@/components/Checkbox';

import { TProductsSelectorProps } from './ProductsSelector.types.d';
import './ProductsSelector.scss';

const ProductsSelector: React.FC<TProductsSelectorProps> = ({ label, required, value = [], onChange }) => {
  const dispatch = useDispatch();
  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;

  const [getProductsParamsRequest, setGetProductsParamsRequest] = useState<TGetProductsParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    auditingStatuses: `${EAuditingStatus.ACTIVE},${EAuditingStatus.INACTIVE}`,
  });
  const getProductsLoading = useSelector((state: TRootState) => state.loadingReducer[EGetProductsAction.GET_PRODUCTS]);
  const productsState = useSelector((state: TRootState) => state.productReducer.getProductsResponse)?.data;

  const {
    options: optionsCategories,
    handleLoadMore: handleLoadMoreCategories,
    handleSearch: handleSearchCategories,
  } = useOptionsPaginate(
    getCategoriesAction,
    'categoryReducer',
    'getCategoriesResponse',
    EGetCategoriesAction.GET_CATEGORIES,
    undefined,
    { auditingStatuses: EAuditingStatus.ACTIVE },
    { branchIds: currentBranchId },
  );

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetProductsParamsRequest({
      ...getProductsParamsRequest,
      page,
      size,
      sort,
    });
  };

  const handleSearch = (keyword?: string): void => {
    setGetProductsParamsRequest({
      ...getProductsParamsRequest,
      page: DEFAULT_PAGE,
      search: keyword,
    });
  };

  const handleSelectProduct = (checked: boolean, data: TProduct): void => {
    if (checked) {
      const newData = [...value, { label: data?.name, value: data.id, data, quantity: 1 }];
      onChange?.(newData);
    } else {
      const newData = value.filter((item) => item.value !== data.id);
      onChange?.(newData);
    }
  };

  const handleChangeQuantity = (quantity: number, data: TProduct): void => {
    const newData = value?.map((item) => {
      if (item.value === data.id) {
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
      key: 'checkbox',
      dataIndex: 'checkbox',
      title: '',
      width: 72,
      render: (_: string, record: TProduct): React.ReactElement => {
        const target = value?.find((item) => item.value === record.id);
        return (
          <Checkbox
            size="large"
            value={Boolean(target)}
            onChange={(checked): void => handleSelectProduct(checked, record)}
          />
        );
      },
    },
    {
      key: 'image',
      dataIndex: 'image',
      title: 'Ảnh',
      width: 72,
      render: (_: string, record: TProduct): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={72} image={getFullUrlStatics(record.image)} defaultImage shape="square" />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      sorter: true,
      keySort: 'name',
      className: 'limit-width',
      render: (_: string, record: TProduct): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title ellipsis-2">{record?.name || EEmpty.DASH}</div>
            <div className="Table-info-description" style={{ color: EIconColor.PURPLE_HEART }}>
              {record?.code || EEmpty.DASH}
            </div>
            <div className="Table-info-description word-break-all ellipsis-2">{record?.description || EEmpty.DASH}</div>
          </div>
        );
      },
    },
    {
      key: 'price',
      dataIndex: 'price',
      title: 'Giá',
      className: 'nowrap',
      sorter: true,
      keySort: 'selling_price',
      render: (_: string, record: TProduct): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{formatCurrency({ amount: record?.selling_price, showSuffix: true })}</div>
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
        const target = value?.find((item) => item.value === record.id);

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
  ];

  const getProducts = useCallback(() => {
    dispatch(
      getProductsAction.request({
        params: {
          ...getProductsParamsRequest,
          categoryId: (getProductsParamsRequest?.categoryId as unknown as TSelectOption)?.value,
        },
        headers: { branchIds: currentBranchId },
      }),
    );
  }, [dispatch, getProductsParamsRequest, currentBranchId]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <FormField label={label} required={required} className="ProductsSelector">
      <Table
        useCardResponsive={false}
        header={
          <Row gutter={[16, 16]}>
            <Col>
              <Input
                style={{ minWidth: '24rem' }}
                label="Tìm kiếm"
                suffixIcon={<Icon name={EIconName.Search} color={EIconColor.TUNDORA} />}
                onSearch={handleSearch}
              />
            </Col>
            <Col>
              <Select
                label="Danh mục"
                placeholder="Chọn dữ liệu"
                value={getProductsParamsRequest?.categoryId as any}
                allowClear
                showSearch
                options={optionsCategories}
                onLoadMore={handleLoadMoreCategories}
                onSearch={handleSearchCategories}
                onChange={(option): void => {
                  setGetProductsParamsRequest({
                    ...getProductsParamsRequest,
                    page: DEFAULT_PAGE,
                    categoryId: option as any,
                  });
                }}
              />
            </Col>
          </Row>
        }
        columns={columns}
        scroll={{ y: 97 * 5 }}
        dataSources={productsState?.content || []}
        loading={getProductsLoading}
        page={getProductsParamsRequest.page}
        pageSize={getProductsParamsRequest.size}
        total={productsState?.total_elements}
        onPaginationChange={handlePaginationChange}
      />
    </FormField>
  );
};

export default ProductsSelector;
