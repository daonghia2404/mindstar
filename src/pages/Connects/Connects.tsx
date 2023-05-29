import { Card, Col, Row } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import Input from '@/components/Input';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Table from '@/components/Table';
import Switch from '@/components/Switch';
import Status, { EStatusStyleType } from '@/components/Status';
import { TSelectOption } from '@/components/Select';
import { TGetBranchesParams } from '@/services/api';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { EAuditingStatus } from '@/common/enums';
import { TBranch } from '@/common/models';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import DropdownMenu from '@/components/DropdownMenu';
import Button, { EButtonStyleType } from '@/components/Button';
import { TRootState } from '@/redux/reducers';
import { EGetBranchesAction } from '@/redux/actions';

import './Connects.scss';

const Connects: React.FC = () => {
  const [getBranchesParamsRequest, setGetBranchesParamsRequest] = useState<TGetBranchesParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    auditingStatuses: `${EAuditingStatus.ACTIVE},${EAuditingStatus.INACTIVE}`,
  });
  const [modalBranchFormState, setModalBranchFormState] = useState<{ visible: boolean; data?: TBranch }>({
    visible: false,
  });
  const [modalDeleteBranchState, setModalDeleteBranchState] = useState<{ visible: boolean; data?: TBranch }>({
    visible: false,
  });
  const handleOpenModalBranchForm = (data?: TBranch): void => {
    setModalBranchFormState({ visible: true, data });
  };
  const handleOpenModalDeleteBranch = (data?: TBranch): void => {
    setModalDeleteBranchState({ visible: true, data });
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
      value: 'setting',
      label: 'Cài đặt',
      icon: EIconName.Settings,
      onClick: (): void => {},
    },
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalBranchForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteBranch(data);
      },
    },
  ];
  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
      sorter: true,
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record.name}</div>
          <div className="Table-info-description">{record.post}</div>
        </div>
      ),
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'ADDRESS',
      // width: 180,
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.addres}</div>
        </div>
      ),
    },
    {
      key: 'contact',
      dataIndex: 'contact',
      title: 'CONTACT',
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.contact}</div>
        </div>
      ),
    },
    {
      key: 'hotline',
      dataIndex: 'hotline',
      title: 'HOTLINE',
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.hotline}</div>
        </div>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'STATUS',
      render: (_: string, record: TBranch): React.ReactElement => (
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
      post: '0 posts',
      addres: '99 nguyen van cu',
      contact: 'Huan',
      hotline: '0866753141',
    },
    {
      key: '2',
      name: 'Trinh Van Huan',
      post: '0 posts',
      addres: '99 nguyen van cu',
      contact: 'Huan',
      hotline: '0866753141',
    },
    {
      key: '3',
      name: 'Trinh Van Huan',
      post: '0 posts',
      addres: '99 nguyen van cu',
      contact: 'Huan',
      hotline: '0866753141',
    },
    {
      key: '4',
      name: 'Trinh Van Huan',
      post: '0 posts',
      addres: '99 nguyen van cu',
      contact: 'Huan',
      hotline: '0866753141',
    },
  ];

  const dashboardState = useSelector((state: TRootState) => state.dashboardReducer.getDashboardResponse)?.data;
  const getBranchesLoading = useSelector((state: TRootState) => state.loadingReducer[EGetBranchesAction.GET_BRANCHES]);

  const yearsOptions = (): TSelectOption[] => {
    if (dashboardState?.start_year) {
      const options = [];

      const currentYear = moment().year();
      // eslint-disable-next-line no-plusplus
      for (let i = dashboardState.start_year; i <= currentYear; i++) {
        options.push({ value: String(i), label: String(i) });
      }

      return [
        {
          value: '',
          label: 'Tất cả',
        },
        ...options.reverse(),
      ];
    }
    return [];
  };
  return (
    <div className="Connects">
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
            <div className="Connects-filter">
              <Row gutter={[16, 16]}>
                <Col>
                  <div>
                    <Status label="Active" styleType={EStatusStyleType.SUCCESS} />
                  </div>
                </Col>
                <Col>
                  <div>
                    <Status label="Inactive" styleType={EStatusStyleType.DANGER} />
                  </div>
                </Col>
              </Row>
            </div>
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
    </div>
  );
};

export default Connects;
