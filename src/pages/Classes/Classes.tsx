import React, { useCallback, useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { EEmpty } from '@/common/enums';
import { TClass } from '@/common/models';
import Button, { EButtonStyleType } from '@/components/Button';
import Card from '@/components/Card';
import DropdownMenu from '@/components/DropdownMenu';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import Table from '@/components/Table';
import Tags from '@/components/Tags';
import { Paths } from '@/pages/routers';
import { EGetClassesAction, getClassesAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { TGetClassesParams } from '@/services/api';
import { getFullUrlStatics } from '@/utils/functions';
import ModalDeleteClass from '@/pages/Classes/ModalDeleteClass';

import './Classes.scss';
import ModalClassForm from '@/pages/Classes/ModalClassForm';

const Classes: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getClassesLoading = useSelector((state: TRootState) => state.loadingReducer[EGetClassesAction.GET_CLASSES]);
  const classsState = useSelector((state: TRootState) => state.classReducer.getClassesResponse)?.data;
  const [modalClassFormState, setModalClassFormState] = useState<{ visible: boolean; data?: TClass }>({
    visible: false,
  });
  const [modalDeleteClassState, setModalDeleteClassState] = useState<{ visible: boolean; data?: TClass }>({
    visible: false,
  });

  const [getClassesParamsRequest, setGetClassesParamsRequest] = useState<TGetClassesParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
  });

  const handleOpenModalClassForm = (data?: TClass): void => {
    setModalClassFormState({ visible: true, data });
  };

  const handleCloseModalClassForm = (): void => {
    setModalClassFormState({ visible: false });
  };

  const handleOpenModalDeleteClass = (data?: TClass): void => {
    setModalDeleteClassState({ visible: true, data });
  };

  const handleCloseModalDeleteClass = (): void => {
    setModalDeleteClassState({ visible: false });
  };

  const handleSearch = (keyword?: string): void => {
    setGetClassesParamsRequest({
      ...getClassesParamsRequest,
      page: DEFAULT_PAGE,
      name: keyword,
    });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetClassesParamsRequest({
      ...getClassesParamsRequest,
      page,
      size,
      sort,
    });
  };

  const dataTableDropdownActions = (data?: TClass): TDropdownMenuItem[] => [
    {
      value: 'view',
      label: 'Chi Tiết',
      icon: EIconName.Eye,
      onClick: (): void => {
        navigate(Paths.ClassDetail(String(data?.id)));
      },
    },
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalClassForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteClass(data);
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
      width: 180,
      render: (_: string, record: TClass): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.name || EEmpty.DASH}</div>
            <div className="Table-info-description">{record?.number_of_players || EEmpty.ZERO} học viên</div>
          </div>
        );
      },
    },
    {
      key: 'branch',
      dataIndex: 'branch',
      title: 'Chi nhánh',
      render: (_: string, record: TClass): React.ReactElement => {
        return (
          <Tags
            options={[
              {
                label: record?.branch?.name,
                value: String(record?.branch?.id),
                data: { iconName: EIconName.MapMarker },
              },
            ]}
          />
        );
      },
    },
    {
      key: 'teachers',
      dataIndex: 'teachers',
      title: 'Giáo Viên',
      render: (_: string, record: TClass): React.ReactElement =>
        record?.managers && record?.managers?.length > 0 ? (
          <Tags
            options={record?.managers?.map((item) => ({
              label: item.name,
              value: String(item.id),
              data: { avatar: getFullUrlStatics(item.avatar) },
              onClick: (): void => {
                navigate(Paths.ManagerDetail(String(item.id)));
              },
            }))}
          />
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'description',
      dataIndex: 'description',
      title: 'Mô Tả',
      className: 'limit-width',
      width: 320,
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TClass): React.ReactElement => (
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

  const getClasses = useCallback(() => {
    dispatch(getClassesAction.request({ params: getClassesParamsRequest, headers: { branchIds: currentBranchId } }));
  }, [dispatch, getClassesParamsRequest, currentBranchId]);

  useEffect(() => {
    getClasses();
  }, [getClasses]);

  return (
    <div className="Classes">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Classes-filter">
            <Row gutter={[16, 16]}>
              <Col>
                <Input
                  style={{ minWidth: '24rem' }}
                  label="Tìm kiếm"
                  suffixIcon={<Icon name={EIconName.Search} color={EIconColor.TUNDORA} />}
                  onSearch={handleSearch}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Classes-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.ChalkBoard} color={EIconColor.TUNDORA} />
                      Tổng Lớp Học: <strong>{classsState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      title="Tạo mới Lớp Học"
                      styleType={EButtonStyleType.PURPLE}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                      onClick={handleOpenModalClassForm}
                    />
                  </Col>
                </Row>
              }
              loading={getClassesLoading}
              columns={columns}
              dataSources={classsState?.content || []}
              page={getClassesParamsRequest?.page}
              pageSize={getClassesParamsRequest?.size}
              total={classsState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>

      <ModalClassForm {...modalClassFormState} onClose={handleCloseModalClassForm} onSuccess={getClasses} />
      <ModalDeleteClass {...modalDeleteClassState} onClose={handleCloseModalDeleteClass} onSuccess={getClasses} />
    </div>
  );
};

export default Classes;
