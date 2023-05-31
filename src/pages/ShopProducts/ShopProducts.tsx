import { Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@/components/Card';
import Select from '@/components/Select';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import Input from '@/components/Input';

import './ShopProducts.scss';
import { TRootState } from '@/redux/reducers';
import Table from '@/components/Table';
import Button, { EButtonStyleType } from '@/components/Button';
import { EAuditingStatus } from '@/common/enums';
import { EGetBranchesAction, getClassesAction } from '@/redux/actions';
import { TBranch } from '@/common/models';
import { getFullUrlStatics } from '@/utils/functions';
import DropdownMenu from '@/components/DropdownMenu';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import { TGetBranchesParams } from '@/services/api';
import Avatar from '@/components/Avatar';
import Switch from '@/components/Switch';
import ModalDeleteShopProducts from './ModalDeleteShopProducts';
import ModalShopProductsForm from './ModalShopProductsFrom';

const ShopProducts: React.FC = () => {
  const [getBranchesParamsRequest, setGetShopProductsParamsRequest] = useState<TGetBranchesParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    auditingStatuses: `${EAuditingStatus.ACTIVE},${EAuditingStatus.INACTIVE}`,
  });
  const [modalShopProductsFormState, setModalShopProductsFormState] = useState<{ visible: boolean; data?: TBranch }>({
    visible: false,
  });
  const [modalDeleteShopProductsState, setModalDeleteShopProductsState] = useState<{ visible: boolean; data?: any }>({
    visible: false,
  });
  console.log(modalShopProductsFormState);
  const handleOpenModalShopProductsForm = (data?: TBranch): void => {
    setModalShopProductsFormState({ visible: true, data });
  };
  const handleCloseModalShopProductsForm = (data?: TBranch): void => {
    setModalShopProductsFormState({ visible: false, data });
  };
  const handleOpenModalDeleteShopProducts = (data?: TBranch): void => {
    setModalDeleteShopProductsState({ visible: true, data });
  };
  const handleCloseModalDeleteShopProducts = (data?: TBranch): void => {
    setModalDeleteShopProductsState({ visible: true, data });
  };
  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetShopProductsParamsRequest({
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
        handleOpenModalShopProductsForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteShopProducts(data);
      },
    },
  ];
  const columns = [
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: 'PIC',
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <Avatar shape="square" size={48} image={getFullUrlStatics(record?.avatar)} />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'PRODUCT NAME',
      className: 'limit-width',
      sorter: true,
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.name}</div>
          <div className="Table-info-description">{record?.desc}</div>
        </div>
      ),
    },
    {
      key: 'category',
      dataIndex: 'category',
      title: 'CATEGORY',
      className: 'limit-width',
      sorter: true,
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.yearold}</div>
        </div>
      ),
    },
    {
      key: 'price',
      dataIndex: 'price',
      title: 'PRICE',
      sorter: true,
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.year}</div>
          <div className="Table-info-description">{record?.hour}</div>
        </div>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'ON SALE',
      sorter: true,
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
      name: 'Trinh Van Huan',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      desc: 'Tập Sự',
      yearold: 'U13',
      year: 'Tue 23/05/2023',
      hour: '19:00',
      explain: '12345',
    },
    {
      key: '1',
      name: 'Trinh Van Huan',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      desc: 'Tập Sự',
      yearold: 'U13',
      year: 'Tue 23/05/2023',
      hour: '19:00',
      explain: '12345',
    },
    {
      key: '1',
      name: 'Trinh Van Huan',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      desc: 'Tập Sự',
      yearold: 'U13',
      year: 'Tue 23/05/2023',
      hour: '19:00',
      explain: '12345',
    },
    {
      key: '1',
      name: 'Trinh Van Huan',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      desc: 'Tập Sự',
      yearold: 'U13',
      year: 'Tue 23/05/2023',
      hour: '19:00',
      explain: '12345',
    },
  ];
  const dataDreaksTimeOff = [
    { label: '10', value: '10' },
    { label: '25', value: '25' },
    { label: '50', value: '50' },
    { label: '75', value: '75' },
    { label: '100', value: '100' },
  ];
  const getBranchesLoading = useSelector((state: TRootState) => state.loadingReducer[EGetBranchesAction.GET_BRANCHES]);
  return (
    <div className="ShopProducts">
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
                  <Col>
                    <Select label="All Categories" options={dataDreaksTimeOff} placement="topLeft" size="middle" />
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
      <ModalShopProductsForm {...modalShopProductsFormState} onClose={handleCloseModalShopProductsForm} />
      <ModalDeleteShopProducts {...modalDeleteShopProductsState} onClose={handleCloseModalDeleteShopProducts} />
    </div>
  );
};

export default ShopProducts;
