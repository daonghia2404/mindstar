import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataDayOfWeeksOptions } from '@/common/constants';
import { EEmpty, EFormat } from '@/common/enums';
import Button, { EButtonStyleType } from '@/components/Button';
import Card from '@/components/Card';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import { TGetPracticesParams } from '@/services/api';
import Table from '@/components/Table';
import { TRootState } from '@/redux/reducers';
import { EGetPracticesAction, getPracticesAction } from '@/redux/actions';
import DropdownMenu from '@/components/DropdownMenu';
import { TUser } from '@/common/models';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import { formatISODateToDateTime } from '@/utils/functions';
import Tags from '@/components/Tags';
import ModalDeletePractices from '@/pages/Practices/ModalDeletePractices';
import ModalPlayerForm from '@/pages/Players/ModalPlayerForm';
import { Paths } from '@/pages/routers';
import ModalPracticeForm from '@/pages/Practices/ModalPracticeForm';

import './Practices.scss';

const Practices: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getPracticesLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetPracticesAction.GET_PRACTICES],
  );
  const practicesState = useSelector((state: TRootState) => state.practiceReducer.getPracticesResponse)?.data;

  const [modalPlayerFormState, setModalPlayerFormState] = useState<{ visible: boolean; dataPractice?: TUser }>({
    visible: false,
  });
  const [modalDeletePracticeState, setModalDeletePracticeState] = useState<{ visible: boolean; data?: TUser }>({
    visible: false,
  });
  const [modalPracticeFormState, setModalPracticeFormState] = useState<{ visible: boolean; data?: TUser }>({
    visible: false,
  });

  const [getPracticesParamsRequest, setGetPracticesParamsRequest] = useState<TGetPracticesParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    sort: 'update_date:desc',
  });

  const handleOpenModalPlayerForm = (data?: TUser): void => {
    setModalPlayerFormState({ visible: true, dataPractice: data });
  };

  const handleCloseModalPlayerForm = (): void => {
    setModalPlayerFormState({ visible: false });
  };

  const handleOpenModalDeletePractice = (data?: TUser): void => {
    setModalDeletePracticeState({ visible: true, data });
  };

  const handleCloseModalDeletePractice = (): void => {
    setModalDeletePracticeState({ visible: false });
  };

  const handleOpenModalPracticeForm = (data?: TUser): void => {
    setModalPracticeFormState({ visible: true, data });
  };

  const handleCloseModalPracticeForm = (): void => {
    setModalPracticeFormState({ visible: false });
  };

  const handleSearch = (keyword?: string): void => {
    setGetPracticesParamsRequest({
      ...getPracticesParamsRequest,
      page: DEFAULT_PAGE,
      search: keyword,
    });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetPracticesParamsRequest({
      ...getPracticesParamsRequest,
      page,
      size,
      sort,
    });
  };

  const dataTableDropdownActions = (data?: TUser): TDropdownMenuItem[] => [
    {
      value: 'register',
      label: 'Đăng ký học viên',
      icon: EIconName.Plus,
      onClick: (): void => {
        handleOpenModalPlayerForm(data);
      },
    },
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalPracticeForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeletePractice(data);
      },
    },
  ];

  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      className: 'limit-width',
      render: (_: string, record: TUser): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.name || EEmpty.DASH}</div>
            <div className="Table-info-description">
              {record?.date_of_birth
                ? formatISODateToDateTime(record.date_of_birth, EFormat['DD/MM/YYYY'])
                : EEmpty.DASH}
            </div>
          </div>
        );
      },
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'Địa chỉ',
      className: 'limit-width',
      render: (value: string, record: TUser): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{value || EEmpty.DASH}</div>
            <div className="Table-info-description">{record?.city_name || EEmpty.DASH}</div>
          </div>
        );
      },
    },
    {
      key: 'mobile',
      dataIndex: 'mobile',
      title: 'Số điện thoại',
      render: (value: string): React.ReactElement =>
        value ? (
          <a href={`tel: ${value}`} className="Table-link" onClick={(e): void => e.stopPropagation()}>
            {value}
          </a>
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'branch',
      dataIndex: 'branch',
      title: 'Chi nhánh đăng ký',
      render: (_: string, record: TUser): React.ReactElement =>
        record?.branch_id ? (
          <Tags
            options={[
              {
                label: record?.branch_name,
                value: String(record?.branch_id),
                data: { iconName: EIconName.MapMarker },
              },
            ]}
          />
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'schedules',
      dataIndex: 'schedules',
      title: 'Lịch học đăng ký',
      render: (_: string, record: TUser): React.ReactElement => {
        const schedules = (record?.player_schedules || record?.schedules)?.filter((item) => item.day_of_week);

        return schedules?.length === 0 ? (
          <>{EEmpty.DASH}</>
        ) : (
          <Tags
            options={schedules
              ?.filter((item) => item.day_of_week)
              ?.map((item) => {
                return item?.day_of_week
                  ?.split(',')
                  ?.filter((subItem) => subItem)
                  ?.map((subItem) => {
                    const startTime = formatISODateToDateTime(item.at_time, EFormat['HH:mm']);
                    const endTime = formatISODateToDateTime(
                      item.at_time + item.duration_in_second * 1000,
                      EFormat['HH:mm'],
                    );
                    const dayLabel = dataDayOfWeeksOptions.find((option) => option.value === subItem)?.label;

                    return {
                      label: `${dayLabel} | ${startTime} - ${endTime}`,
                      value: subItem,
                      data: { ...item, iconName: EIconName.Calendar },
                    };
                  });
              })
              ?.flat()}
          />
        );
      },
    },
    {
      key: 'note',
      dataIndex: 'note',
      title: 'Ghi chú',
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TUser): React.ReactElement => (
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

  const getPractices = useCallback(() => {
    dispatch(
      getPracticesAction.request({ params: getPracticesParamsRequest, headers: { branchIds: currentBranchId } }),
    );
  }, [dispatch, getPracticesParamsRequest, currentBranchId]);

  useEffect(() => {
    getPractices();
  }, [getPractices]);

  return (
    <div className="Practices">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Practices-filter">
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
          <Card className="Practices-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.UsersGroup} color={EIconColor.TUNDORA} />
                      Tổng Học Thử Viên: <strong>{practicesState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                </Row>
              }
              loading={getPracticesLoading}
              columns={columns}
              dataSources={practicesState?.content || []}
              page={getPracticesParamsRequest?.page}
              pageSize={getPracticesParamsRequest?.size}
              total={practicesState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>

      <ModalPlayerForm
        {...modalPlayerFormState}
        onClose={handleCloseModalPlayerForm}
        onSuccess={(): void => {
          navigate(Paths.Players);
        }}
      />
      <ModalDeletePractices
        {...modalDeletePracticeState}
        onClose={handleCloseModalDeletePractice}
        onSuccess={getPractices}
      />
      <ModalPracticeForm {...modalPracticeFormState} onClose={handleCloseModalPracticeForm} onSuccess={getPractices} />
    </div>
  );
};

export default Practices;
