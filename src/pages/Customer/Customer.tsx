import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '@/components/Card';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import Input from '@/components/Input';

import './Customer.scss';
import { TRootState } from '@/redux/reducers';
import Table from '@/components/Table';
import { EAuditingStatus } from '@/common/enums';
import { EGetBranchesAction } from '@/redux/actions';
import { getFullUrlStatics } from '@/utils/functions';
import { TGetBranchesParams } from '@/services/api';
import Avatar from '@/components/Avatar';

const Customer: React.FC = () => {
  // const branchesState = useSelector((state: TRootState) => state.branchReducer.getBranchesResponse)?.data;
  const [getCustomerParamsRequest, setGetCustomerParamsRequest] = useState<TGetBranchesParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    auditingStatuses: `${EAuditingStatus.ACTIVE},${EAuditingStatus.INACTIVE}`,
  });
  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetCustomerParamsRequest({
      ...getCustomerParamsRequest,
      page,
      size,
      sort,
    });
  };
  const handleSearch = (keyword?: string): void => {
    setGetCustomerParamsRequest({
      ...getCustomerParamsRequest,
      page: DEFAULT_PAGE,
      // name: keyword,
    });
  };
  const columns = [
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: '',
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <Avatar shape="circle" size={48} image={getFullUrlStatics(record?.avatar)} />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'NAME',
      sorter: true,
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.name}</div>
          <div className="Table-info-description">{record?.phone}</div>
        </div>
      ),
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'ADDRESS',
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.addres}</div>
        </div>
      ),
    },
    {
      key: 'player',
      dataIndex: 'player',
      title: 'PLAYER',
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.player}</div>
        </div>
      ),
    },
    {
      key: 'earnpoints',
      dataIndex: 'earnpoints',
      title: 'EARN POINTS',
      sorter: true,
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.use}</div>
          <div className="Table-info-description">{record?.point}</div>
        </div>
      ),
    },
    {
      key: 'totalspending',
      dataIndex: 'totalspending',
      title: 'TOTAL SPENDING',
      sorter: true,
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.total}</div>
        </div>
      ),
    },
    {
      key: 'create date',
      dataIndex: 'create date',
      title: 'CREATE DATE',
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.date}</div>
        </div>
      ),
    },
    {
      key: 'device name',
      dataIndex: 'device name',
      title: 'DAVICE NAME',
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.device}</div>
        </div>
      ),
    },
  ];
  const dataSource = [
    {
      phone: '0866743141',
      name: 'Trinh Van Huan',
      addres: 'LONG BIEN',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      player: 'Trinh Văn Hảo',
      use: '0',
      point: 'Tiềm Năng',
      total: '2.040.000 ₫',
      date: '23/05/2023',
      device: '-',
    },
    {
      phone: '0866743141',
      name: 'Trinh Van Huan',
      addres: 'LONG BIEN',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      player: 'Trinh Văn Hảo',
      use: '0',
      point: 'Tiềm Năng',
      total: '2.040.000 ₫',
      date: '23/05/2023',
      device: '-',
    },
    {
      phone: '0866743141',
      name: 'Trinh Van Huan',
      addres: 'LONG BIEN',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      player: 'Trinh Văn Hảo',
      use: '0',
      point: 'Tiềm Năng',
      total: '2.040.000 ₫',
      date: '23/05/2023',
      device: '-',
    },
    {
      phone: '0866743141',
      name: 'Trinh Van Huan',
      addres: 'LONG BIEN',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      player: 'Trinh Văn Hảo',
      use: '0',
      point: 'Tiềm Năng',
      total: '2.040.000 ₫',
      date: '23/05/2023',
      device: '-',
    },
    {
      phone: '0866743141',
      name: 'Trinh Van Huan',
      addres: 'LONG BIEN',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      player: 'Trinh Văn Hảo',
      use: '0',
      point: 'Tiềm Năng',
      total: '2.040.000 ₫',
      date: '23/05/2023',
      device: '-',
    },
  ];
  const getCustomerLoading = useSelector((state: TRootState) => state.loadingReducer[EGetBranchesAction.GET_BRANCHES]);
  return (
    <div className="Customer">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Customer-filter">
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
          <Card className="Customer-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.Users} color={EIconColor.TUNDORA} />
                      Tổng số khách hàng:
                      {/* <strong>{branchesState?.total_elements || EEmpty.ZERO}</strong> */}
                    </div>
                  </Col>
                </Row>
              }
              loading={getCustomerLoading}
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
    </div>
  );
};

export default Customer;
