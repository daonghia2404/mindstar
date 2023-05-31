import { Card, Col, Row } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Input from '@/components/Input';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Table from '@/components/Table';
import Switch from '@/components/Switch';
import { TGetBranchesParams } from '@/services/api';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { EAuditingStatus } from '@/common/enums';
import { TBranch } from '@/common/models';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import DropdownMenu from '@/components/DropdownMenu';
import Button, { EButtonStyleType } from '@/components/Button';
import { TRootState } from '@/redux/reducers';
import { EGetBranchesAction } from '@/redux/actions';
import ModalCategoryForm from '@/pages/Category/ModalCategoryForm';
import ModalDeleteCategory from '@/pages/Category/ModalDeleteCategory';

import './Category.scss';

const Category: React.FC = () => {
  const [getBranchesParamsRequest, setGetBranchesParamsRequest] = useState<TGetBranchesParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    auditingStatuses: `${EAuditingStatus.ACTIVE},${EAuditingStatus.INACTIVE}`,
  });
  const [modalCategoryFormState, setmodalCategoryFormState] = useState<{ visible: boolean; data?: TBranch }>({
    visible: false,
  });
  const [modalDeleteCategoryState, setmodalDeleteCategoryState] = useState<{ visible: boolean; data?: TBranch }>({
    visible: false,
  });
  const handleOpenModalCategoryForm = (data?: TBranch): void => {
    setmodalCategoryFormState({ visible: true, data });
  };
  const handleOpenModalDeleteCategory = (data?: TBranch): void => {
    setmodalDeleteCategoryState({ visible: true, data });
  };
  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetBranchesParamsRequest({
      ...getBranchesParamsRequest,
      page,
      size,
      sort,
    });
  };
  const dataTableDropdownActions = (data?: TBranch): TDropdownMenuItem[] => [
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
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record.id}</div>
        </div>
      ),
    },
    {
      key: 'categoryname',
      dataIndex: 'categoryname',
      title: 'CATEGORYNAME',
      sorter: true,
      // width: 180,
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.category}</div>
        </div>
      ),
    },
    {
      key: 'ofproduct',
      dataIndex: 'ofproduct',
      title: '#OF PRODUCT ',
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.product}</div>
        </div>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'STATUS',
      render: (): React.ReactElement => (
        <div className="Table-info">
          <Switch readOnlyText />
        </div>
      ),
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TBranch): React.ReactElement => (
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
  const dataSource = [
    {
      key: '1',
      category: 'Trinh Van Huan',
      id: '1',
      product: '0',
    },
    {
      key: '1',
      category: 'Trinh Van Huan',
      id: '1',
      product: '0',
    },
    {
      key: '1',
      category: 'Trinh Van Huan',
      id: '1',
      product: '0',
    },
    {
      key: '1',
      category: 'Trinh Van Huan',
      id: '1',
      product: '0',
    },
  ];

  const getBranchesLoading = useSelector((state: TRootState) => state.loadingReducer[EGetBranchesAction.GET_BRANCHES]);

  return (
    <div className="Category">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Branches-filter">
            <Row gutter={[16, 16]}>
              <Col span={22}>
                <Row gutter={[24, 24]}>
                  <Col>
                    <Input
                      style={{ minWidth: '24rem' }}
                      label="Tìm kiếm"
                      suffixIcon={<Icon name={EIconName.Search} color={EIconColor.TUNDORA} />}
                      // onSearch={handleSearch}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Branches-table">
            <Table
              loading={getBranchesLoading}
              columns={columns}
              dataSources={dataSource}
              page={10}
              pageSize={50}
              total={500}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>
      <ModalCategoryForm {...modalCategoryFormState} onClose={handleOpenModalCategoryForm} />
      <ModalDeleteCategory {...modalDeleteCategoryState} onClose={handleOpenModalDeleteCategory} />
    </div>
  );
};

export default Category;
