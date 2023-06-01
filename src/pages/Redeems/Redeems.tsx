import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '@/components/Card';
import Select from '@/components/Select';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import Input from '@/components/Input';

import './Redeems.scss';
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
import Status, { EStatusStyleType } from '@/components/Status';
import ModalRedeemsForm from './ModalRedeemsForm';
import ModalDeleteRedeems from './ModalRedeemsDelete';

const Redeems: React.FC = () => {
  const [getRedeemsParamsRequest, setGetRedeemsParamsRequest] = useState<TGetBranchesParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    auditingStatuses: `${EAuditingStatus.ACTIVE},${EAuditingStatus.INACTIVE}`,
  });
  const [modalRedeemsFormState, setModalRedeemsFormState] = useState<{ visible: boolean; data?: TBranch }>({
    visible: false,
  });
  const [modalDeleteRedeemsState, setModalDeleteRedeemsState] = useState<{ visible: boolean; data?: any }>({
    visible: false,
  });
  const handleOpenModalRedeemsForm = (data?: TBranch): void => {
    setModalRedeemsFormState({ visible: true, data });
  };
  const handleCloseModalRedeemsForm = (data?: TBranch): void => {
    setModalRedeemsFormState({ visible: false, data });
  };
  const handleOpenModalDeleteRedeems = (data?: TBranch): void => {
    setModalDeleteRedeemsState({ visible: true, data });
  };
  const handleCloseModalDeleteRedeems = (data?: TBranch): void => {
    setModalDeleteRedeemsState({ visible: false, data });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetRedeemsParamsRequest({
      ...getRedeemsParamsRequest,
      page,
      size,
      sort,
    });
  };
  const handleSearch = (keyword?: string): void => {
    setGetRedeemsParamsRequest({
      ...getRedeemsParamsRequest,
      page: DEFAULT_PAGE,
      // name: keyword,
    });
  };
  const dataTableDropdownActions = (data?: TBranch): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalRedeemsForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteRedeems(data);
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
          <div className="Table-info-title">{record?.id}</div>
        </div>
      ),
    },
    {
      key: 'player',
      dataIndex: 'player',
      title: 'PLAYER',
      sorter: true,
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.name}</div>
          <div className="Table-info-description">{record?.desc}</div>
          <div className="Table-info-description">{record?.staff}</div>
        </div>
      ),
    },
    {
      key: 'reward',
      dataIndex: 'reward',
      title: 'REWARD',
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <Avatar shape="square" size={48} image={getFullUrlStatics(record?.avatar)} />
        </div>
      ),
    },
    {
      key: 'checkupload',
      dataIndex: 'checkupload',
      title: '',
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.checkupload}</div>
        </div>
      ),
    },
    {
      key: 'used',
      dataIndex: 'used',
      title: 'POINT USED',
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.use}</div>
          <div className="Table-info-description">{record?.point}</div>
        </div>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'STATUS',
      render: (): React.ReactElement => (
        <div className="Table-info">
          <Status label="Pending" styleType={EStatusStyleType.SUCCESS} />
        </div>
      ),
    },
    {
      key: 'issuedate',
      dataIndex: 'issuedate',
      title: 'ISSUEDATE',
      sorter: true,
      render: (_: string, record: any): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.year}</div>
          <div className="Table-info-description">{record?.hour}</div>
        </div>
      ),
    },
    {
      key: 'notes',
      dataIndex: 'notes',
      title: 'NOTES',
      sorter: true,
      render: (record: any): React.ReactElement => <div className="Table-info">{record?.note}</div>,
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
      id: '1',
      name: 'Trinh Van Huan',
      staff: 'NVC',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      desc: '1',
      yearold: 'U13',
      year: 'Tue 23/05/2023',
      hour: '19:00 am',
      checkupload: 'check upload image',
      use: '400',
      point: 'Points',
    },
    {
      id: '2',
      name: 'Trinh Van Huan',
      staff: 'NVC',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      desc: '1',
      yearold: 'U13',
      year: 'Tue 23/05/2023',
      hour: '19:00 am',
      checkupload: 'check upload image',
      use: '400',
      point: 'Points',
    },
    {
      id: '3',
      name: 'Trinh Van Huan',
      staff: 'NVC',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      desc: '1',
      yearold: 'U13',
      year: 'Tue 23/05/2023',
      hour: '19:00 am',
      checkupload: 'check upload image',
      use: '400',
      point: 'Points',
    },
    {
      id: '4',
      name: 'Trinh Van Huan',
      staff: 'NVC',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      desc: '1',
      yearold: 'U13',
      year: 'Tue 23/05/2023',
      hour: '19:00 am',
      checkupload: 'check upload image',
      use: '400',
      point: 'Points',
    },
  ];
  const getRedeemsLoading = useSelector((state: TRootState) => state.loadingReducer[EGetBranchesAction.GET_BRANCHES]);
  return (
    <div className="Redeems">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Redeems-filter">
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
                  <Col>
                    <Select label="All Status" placement="topLeft" size="middle" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Redeems-table">
            <Table
              loading={getRedeemsLoading}
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
      <ModalRedeemsForm {...modalRedeemsFormState} onClose={handleCloseModalRedeemsForm} />
      <ModalDeleteRedeems {...modalDeleteRedeemsState} onClose={handleCloseModalDeleteRedeems} />
    </div>
  );
};

export default Redeems;
