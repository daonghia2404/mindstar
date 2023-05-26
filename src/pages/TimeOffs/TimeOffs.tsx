import { Col, Row } from 'antd';
import React, { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Card from '@/components/Card';
import Select, { TSelectOption } from '@/components/Select';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import Input from '@/components/Input';

import './TimeOffs.scss';
import { TRootState } from '@/redux/reducers';
import Table from '@/components/Table';
import Button, { EButtonStyleType } from '@/components/Button';
import { EAuditingStatus } from '@/common/enums';
import { EGetBranchesAction } from '@/redux/actions';
import { TBranch } from '@/common/models';
import { getFullUrlStatics } from '@/utils/functions';
import DropdownMenu from '@/components/DropdownMenu';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import { TGetBranchesParams } from '@/services/api';
import Avatar from '@/components/Avatar';

const TimeOffs: React.FC = () => {
  const [filterYear, setFilterYear] = useState<TSelectOption | undefined>({
    label: String(moment().year()),
    value: String(moment().year()),
  });
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
  const dataTimeOff = [
    { label: '10', value: '10' },
    { label: '25', value: '25' },
    { label: '50', value: '50' },
    { label: '75', value: '75' },
    { label: '100', value: '100' },
  ];
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
      key: 'avatar',
      dataIndex: 'avatar',
      title: '',
      render: (_: string, record: TBranch): React.ReactElement => (
        <div className="Table-info">
          <Avatar size={48} image={getFullUrlStatics(record?.avatar)} />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
      className: 'limit-width',
      sorter: true,
      keySort: 'name',
      // width: 180,
      render: (_: string, record: TBranch): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.name}</div>
          <div className="Table-info-description">{record?.desc}</div>
        </div>
      ),
    },
    {
      key: 'classname',
      dataIndex: 'classname',
      title: 'CLASS NAME',
      className: 'limit-width',
      render: (_: string, record: TBranch): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.classname}</div>
        </div>
      ),
    },
    {
      key: 'manager',
      dataIndex: 'manager',
      title: 'LESSON OFF',
      className: 'limit-width',
      sorter: true,
      render: (_: string, record: TBranch): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.year}</div>
          <div className="Table-info-title">{record?.hour}</div>
        </div>
      ),
    },
    {
      key: 'reason',
      dataIndex: 'reason',
      title: 'REASON',
      render: (_: string, record: TBranch): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.explain}</div>
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
    <div className="TimeOffs">
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
                    <Select label="All Classes" options={dataTimeOff} placement="topLeft" size="middle" />
                  </Col>
                </Row>
              </Col>
              <Col span={2}>
                <Select label="Năm" options={yearsOptions()} value={filterYear} onChange={setFilterYear} />
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
    </div>
  );
};

export default TimeOffs;
