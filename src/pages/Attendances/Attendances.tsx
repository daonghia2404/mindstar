import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment, { Moment } from 'moment';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataTypeCheckInOptions } from '@/common/constants';
import { EEmpty, EFormat, ETypeCheckIn } from '@/common/enums';
import Button, { EButtonStyleType } from '@/components/Button';
import Card from '@/components/Card';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import { TGetAttendancesParams } from '@/services/api';
import Table from '@/components/Table';
import { TRootState } from '@/redux/reducers';
import { EGetAttendancesAction, EGetClassesAction, getAttendancesAction, getClassesAction } from '@/redux/actions';
import { TAttendance } from '@/common/models';
import Avatar from '@/components/Avatar';
import { formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import DatePicker from '@/components/DatePicker';
import Select, { TSelectOption } from '@/components/Select';
import { useOptionsPaginate } from '@/utils/hooks';
import ModalCheckIns from '@/pages/Attendances/ModalCheckIns';
import Status from '@/components/Status';

import './Attendances.scss';

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
    EGetClassesAction.GET_CLASSES,
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
      render: (_: string, record: TAttendance): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={48} image={getFullUrlStatics(record?.player?.avatar)} />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      sorter: true,
      keySort: 'name',
      className: 'limit-width',
      render: (_: string, record: TAttendance): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.player?.name || EEmpty.DASH}</div>
            <div className="Table-info-description">
              {record?.player?.date_of_birth
                ? formatISODateToDateTime(record.player?.date_of_birth, EFormat['DD/MM/YYYY'])
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
      render: (_: string, record: TAttendance): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.player?.address || EEmpty.DASH}</div>
            <div className="Table-info-description">{record?.player?.city_name || EEmpty.DASH}</div>
          </div>
        );
      },
    },
    {
      key: 'mobile',
      dataIndex: 'mobile',
      title: 'Số điện thoại',
      render: (_: string, record: TAttendance): React.ReactElement =>
        record?.player?.mobile ? (
          <a href={`tel: ${record?.player?.mobile}`} className="Table-link" onClick={(e): void => e.stopPropagation()}>
            {record?.player?.mobile}
          </a>
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      keySort: 'auditing_status',
      render: (_: string, record: TAttendance): React.ReactElement => {
        const status = dataTypeCheckInOptions.find((item) => item.value === record.checked_in);
        return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : <>{EEmpty.DASH}</>;
      },
    },
    {
      key: 'description',
      dataIndex: 'description',
      title: 'Ghi chú',
      render: (value: string): string => value || EEmpty.DASH,
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
                          Có Mặt:{' '}
                          <strong>
                            {attendancesState?.attendance_count?.find(
                              (item) => item.checked_in === ETypeCheckIn.PRESENT,
                            )?.count || EEmpty.ZERO}
                          </strong>
                        </div>
                      </Col>
                      <Col>
                        <div className="Table-total-item">
                          <Icon name={EIconName.UserX} color={EIconColor.TUNDORA} />
                          Vắng Mặt:{' '}
                          <strong>
                            {attendancesState?.attendance_count?.find((item) => item.checked_in === ETypeCheckIn.ABSENT)
                              ?.count || EEmpty.ZERO}
                          </strong>
                        </div>
                      </Col>
                      {/* <Col>
                        <div className="Table-total-item">
                          <Icon name={EIconName.UserCancel} color={EIconColor.TUNDORA} />
                          Chưa Điểm Danh: <strong>{EEmpty.ZERO}</strong>
                        </div>
                      </Col> */}
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
