import { Card, Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '@/components/Input';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Table from '@/components/Table';
import { TGetCategoriesParams } from '@/services/api';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataAuditingStatusOptions } from '@/common/constants';
import { EEmpty } from '@/common/enums';
import { TCategory } from '@/common/models';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import DropdownMenu from '@/components/DropdownMenu';
import Button, { EButtonStyleType } from '@/components/Button';
import { TRootState } from '@/redux/reducers';
import { EGetCategoriesAction, getCategoriesAction } from '@/redux/actions';
import ModalCategoryForm from '@/pages/Categories/ModalCategoryForm';
import ModalDeleteCategory from '@/pages/Categories/ModalDeleteCategory';
import Status from '@/components/Status';

import './Categories.scss';

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;

  const categoriesState = useSelector((state: TRootState) => state.categoryReducer.getCategoriesResponse)?.data;
  const getCategoriesLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetCategoriesAction.GET_CATEGORIES],
  );
  const [getCategoriesParamsRequest, setGetCategoriesParamsRequest] = useState<TGetCategoriesParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
  });
  const [modalCategoryFormState, setModalCategoryFormState] = useState<{ visible: boolean; data?: TCategory }>({
    visible: false,
  });
  const [modalDeleteCategoryState, setModalDeleteCategoryState] = useState<{ visible: boolean; data?: TCategory }>({
    visible: false,
  });

  const handleOpenModalCategoryForm = (data?: TCategory): void => {
    setModalCategoryFormState({ visible: true, data });
  };
  const handleCloseModalCategoryForm = (): void => {
    setModalCategoryFormState({ visible: false });
  };
  const handleOpenModalDeleteCategory = (data?: TCategory): void => {
    setModalDeleteCategoryState({ visible: true, data });
  };
  const handleCloseModalDeleteCategory = (): void => {
    setModalDeleteCategoryState({ visible: false });
  };

  const handleSearch = (keyword?: string): void => {
    setGetCategoriesParamsRequest({
      ...getCategoriesParamsRequest,
      page: DEFAULT_PAGE,
      name: keyword,
    });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetCategoriesParamsRequest({
      ...getCategoriesParamsRequest,
      page,
      size,
      sort,
    });
  };

  const dataTableDropdownActions = (data?: TCategory): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalCategoryForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteCategory(data);
      },
    },
  ];

  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      sorter: true,
      keySort: 'name',
      className: 'limit-width',
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'description',
      dataIndex: 'description',
      title: 'Mô tả',
      className: 'limit-width',
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'productCount',
      dataIndex: 'productCount',
      sorter: true,
      with: 180,
      keySort: 'products_count',
      title: 'Số lượng sản phẩm ',
      render: (_: string, record: TCategory): React.ReactElement => <>{record.products_count || EEmpty.ZERO}</>,
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      keySort: 'auditing_status',
      render: (_: string, record: TCategory): React.ReactElement => {
        const status = dataAuditingStatusOptions.find((item) => item.value === record.auditing_status);
        return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : <>{EEmpty.DASH}</>;
      },
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TCategory): React.ReactElement => (
        <div onClick={(e): void => e.stopPropagation()}>
          <DropdownMenu placement="bottomRight" options={dataTableDropdownActions(record)}>
            <Button
              iconName={EIconName.DotsVertical}
              iconColor={EIconColor.BLACK}
              size="small"
              styleType={EButtonStyleType.GENERAL_FORM}
            />
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const getCategories = useCallback(() => {
    dispatch(
      getCategoriesAction.request({ params: getCategoriesParamsRequest, headers: { branchIds: currentBranchId } }),
    );
  }, [dispatch, getCategoriesParamsRequest, currentBranchId]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <div className="Categories">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Categories-filter">
            <Row gutter={[16, 16]}>
              <Col span={22}>
                <Row gutter={[24, 24]}>
                  <Col>
                    <Input
                      style={{ minWidth: '24rem' }}
                      label="Tìm kiếm"
                      suffixIcon={<Icon name={EIconName.Search} color={EIconColor.TUNDORA} />}
                      onSearch={handleSearch}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Categories-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.Category} color={EIconColor.TUNDORA} />
                      Tổng Danh Mục: <strong>{categoriesState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      title="Tạo mới Danh Mục"
                      styleType={EButtonStyleType.PURPLE}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                      onClick={handleOpenModalCategoryForm}
                    />
                  </Col>
                </Row>
              }
              loading={getCategoriesLoading}
              columns={columns}
              dataSources={categoriesState?.content || []}
              page={getCategoriesParamsRequest.page}
              pageSize={getCategoriesParamsRequest.size}
              total={categoriesState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>
      <ModalCategoryForm {...modalCategoryFormState} onClose={handleCloseModalCategoryForm} onSuccess={getCategories} />
      <ModalDeleteCategory
        {...modalDeleteCategoryState}
        onClose={handleCloseModalDeleteCategory}
        onSuccess={getCategories}
      />
    </div>
  );
};

export default Categories;
