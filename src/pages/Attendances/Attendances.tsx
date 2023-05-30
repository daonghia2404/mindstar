import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';
import moment, { Moment } from 'moment';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataDegreeTypeOptions } from '@/common/constants';
import { EEmpty, EFormat } from '@/common/enums';
import Button, { EButtonStyleType } from '@/components/Button';
import Card from '@/components/Card';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import { TGetAttendancesParams } from '@/services/api';
import Table from '@/components/Table';
import { TRootState } from '@/redux/reducers';
import { EGetAttendancesAction, getAttendancesAction, getClassesAction } from '@/redux/actions';
import { TUser } from '@/common/models';
import Avatar from '@/components/Avatar';
import { formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import { Paths } from '@/pages/routers';
import DatePicker from '@/components/DatePicker';
import Tags from '@/components/Tags';
import Select, { TSelectOption } from '@/components/Select';
import { useOptionsPaginate } from '@/utils/hooks';

import './Attendances.scss';
import ModalCheckIns from '@/pages/Attendances/ModalCheckIns';

const Attendances: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getAttendancesLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetAttendancesAction.GET_ATTENDANCES],
  );
  const attendancesState = useSelector((state: TRootState) => state.attendanceReducer.getAttendancesResponse)?.data;
  const [modalCheckInsState, setModalCheckInsState] = useState<{ visible: boolean }>({ visible: false });

  const {
    options: optionsClasses,
    handleLoadMore: handleLoadMoreClasses,
    handleSearch: handleSearchClasses,
  } = useOptionsPaginate(
    getClassesAction,
    'classReducer',
    'getClassesResponse',
    undefined,
    {},
    { branchIds: currentBranchId },
  );

  const [getAttendancesParamsRequest, setGetAttendancesParamsRequest] = useState<TGetAttendancesParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    fromDate: moment().startOf('day').valueOf(),
    toDate: moment().endOf('day').valueOf(),
  });

  const handleSearch = (keyword?: string): void => {
    setGetAttendancesParamsRequest({
      ...getAttendancesParamsRequest,
      page: DEFAULT_PAGE,
      search: keyword,
    });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetAttendancesParamsRequest({
      ...getAttendancesParamsRequest,
      page,
      size,
      sort,
    });
  };

  const handleOpenModalCheckIns = (): void => {
    setModalCheckInsState({ visible: true });
  };

  const handleCloseModalCheckIns = (): void => {
    setModalCheckInsState({ visible: false });
  };

  const columns = [
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: '',
      width: 48,
      render: (_: string, record: TUser): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={48} image={getFullUrlStatics(record?.avatar)} />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      className: 'limit-width',
      width: 180,
      render: (_: string, record: TUser): React.ReactElement => {
        const dergeeType = dataDegreeTypeOptions.find((item) => item.value === record.degree_type);
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.name || EEmpty.DASH}</div>
            <div className="Table-info-description" style={{ color: dergeeType?.data?.color }}>
              {dergeeType?.label}
            </div>
          </div>
        );
      },
    },
    {
      key: 'date_of_birth',
      dataIndex: 'date_of_birth',
      title: 'Ngày Sinh',
      render: (_: string, record: TUser): string =>
        record?.date_of_birth ? formatISODateToDateTime(record.date_of_birth, EFormat['DD/MM/YYYY']) : EEmpty.DASH,
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'Địa chỉ',
      className: 'limit-width',
      render: (value: string): string => value || EEmpty.DASH,
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
      key: 'class',
      dataIndex: 'class',
      title: 'Lớp Học',
      render: (_: string, record: TUser): React.ReactElement =>
        record?.class ? (
          <Tags
            options={[
              {
                label: record?.class.name,
                value: String(record?.class.id),
                data: { iconName: EIconName.ChalkBoard },
                onClick: (): void => {
                  navigate(Paths.ClassDetail(String(record?.class.id)));
                },
              },
            ]}
          />
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'branch',
      dataIndex: 'branch',
      title: 'Chi nhánh',
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
  ];

  const getAttendances = useCallback(() => {
    if (getAttendancesParamsRequest.classId) {
      dispatch(
        getAttendancesAction.request({
          params: {
            ...getAttendancesParamsRequest,
            classId: (getAttendancesParamsRequest?.classId as unknown as TSelectOption)?.value,
          },
          headers: { branchIds: currentBranchId },
        }),
      );
    }
  }, [dispatch, getAttendancesParamsRequest, currentBranchId]);

  useEffect(() => {
    if (!getAttendancesParamsRequest?.classId && optionsClasses.length > 0) {
      setGetAttendancesParamsRequest({
        ...getAttendancesParamsRequest,
        classId: optionsClasses[0] as any,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsClasses]);

  useEffect(() => {
    getAttendances();
  }, [getAttendances]);

  return (
    <div className="Attendances">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Attendances-filter">
            <Row gutter={[16, 16]} justify="space-between">
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
                    label="Lớp học"
                    placeholder="Chọn dữ liệu"
                    value={getAttendancesParamsRequest?.classId as any}
                    active
                    showSearch
                    options={optionsClasses}
                    onLoadMore={handleLoadMoreClasses}
                    onSearch={handleSearchClasses}
                    onChange={(option): void => {
                      setGetAttendancesParamsRequest({
                        ...getAttendancesParamsRequest,
                        page: DEFAULT_PAGE,
                        classId: option as any,
                      });
                    }}
                  />
                </Col>
              </Row>

              <Col>
                <DatePicker
                  style={{ minWidth: '18rem' }}
                  value={moment(getAttendancesParamsRequest.fromDate)}
                  label="Ngày"
                  placeholder=" "
                  onChange={(data: Moment): void => {
                    setGetAttendancesParamsRequest({
                      ...getAttendancesParamsRequest,
                      page: DEFAULT_PAGE,
                      fromDate: data?.clone()?.startOf('day')?.valueOf(),
                      toDate: data?.clone()?.endOf('day')?.valueOf(),
                    });
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Attendances-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <Row gutter={[24, 16]}>
                      <Col>
                        <div className="Table-total-item">
                          <Icon name={EIconName.UserCheck} color={EIconColor.TUNDORA} />
                          Có Mặt: <strong>{EEmpty.ZERO}</strong>
                        </div>
                      </Col>
                      <Col>
                        <div className="Table-total-item">
                          <Icon name={EIconName.UserX} color={EIconColor.TUNDORA} />
                          Vắng Mặt: <strong>{EEmpty.ZERO}</strong>
                        </div>
                      </Col>
                      <Col>
                        <div className="Table-total-item">
                          <Icon name={EIconName.UserCancel} color={EIconColor.TUNDORA} />
                          Chưa Điểm Danh: <strong>{EEmpty.ZERO}</strong>
                        </div>
                      </Col>
                    </Row>
                  </Col>

                  <Col>
                    <Button
                      title="Điểm danh"
                      styleType={EButtonStyleType.PURPLE}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                      onClick={handleOpenModalCheckIns}
                    />
                  </Col>
                </Row>
              }
              loading={getAttendancesLoading}
              columns={columns}
              dataSources={attendancesState?.content || []}
              page={getAttendancesParamsRequest?.page}
              pageSize={getAttendancesParamsRequest?.size}
              total={attendancesState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>

      <ModalCheckIns
        {...modalCheckInsState}
        getAttendancesParamsRequest={getAttendancesParamsRequest}
        onClose={handleCloseModalCheckIns}
        onSuccess={getAttendances}
      />
    </div>
  );
};

export default Attendances;
