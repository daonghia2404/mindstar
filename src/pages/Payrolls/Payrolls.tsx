import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { EEmpty, EFormat } from '@/common/enums';
import Card from '@/components/Card';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import Table from '@/components/Table';
import { EGetEventsAction, getEventsAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';

import './Payrolls.scss';
import Select from '@/components/Select';
import DatePicker from '@/components/DatePicker';
import Avatar from '@/components/Avatar';

const Payrolls: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;

  const eventesState = useSelector((state: TRootState) => state.eventReducer.getEventsResponse)?.data;
  const getPayrollsLoading = useSelector((state: TRootState) => state.loadingReducer[EGetEventsAction.GET_EVENTS]);

  const [getPayrollsParamsRequest, setGetPayrollsParamsRequest] = useState<any>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    fromDate: moment().startOf('month')?.valueOf(),
    toDate: moment().endOf('month')?.valueOf(),
  });

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetPayrollsParamsRequest({
      ...getPayrollsParamsRequest,
      page,
      size,
      sort,
    });
  };

  const handleSearch = (keyword?: string): void => {
    setGetPayrollsParamsRequest({
      ...getPayrollsParamsRequest,
      page: DEFAULT_PAGE,
      title: keyword,
    });
  };

  const columns = [
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: '',
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <Avatar shape="circle" size={72} image={record?.image} />
          </div>
        );
      },
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      className: 'limit-width',
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title" style={{ color: EIconColor.PURPLE_HEART }}>
              {record?.name}
            </div>
            <div className="Table-info-description">{record?.desc}</div>
          </div>
        );
      },
    },
    {
      key: 'timekeeping',
      dataIndex: 'timekeeping',
      title: 'Chấm Công',
      className: 'limit-width',
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.timekeeping}</div>
          </div>
        );
      },
    },
    {
      key: 'basic salary',
      dataIndex: 'basic salary',
      title: 'Lương Cơ Bản',
      className: 'limit-width',
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.salary}</div>
          </div>
        );
      },
    },
    {
      key: 'salary increase',
      dataIndex: 'salary increase',
      title: 'Khoản Tăng Lương',
      className: 'limit-width',
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.salary_increase}</div>
          </div>
        );
      },
    },
    {
      key: 'salary reduction',
      dataIndex: 'salary reduction',
      title: 'Khoản Giảm Lương',
      className: 'limit-width',
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.salary_reduction}</div>
          </div>
        );
      },
    },
    {
      key: 'total salary',
      dataIndex: 'total salary',
      title: 'Tổng Lương',
      className: 'limit-width',
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.salary_total}</div>
          </div>
        );
      },
    },
  ];

  const dataSources = [
    {
      key: '1',
      name: 'Trinh Van Huan',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      desc: 'Tập Sự',
      timekeeping: '19.0',
      salary: '1.000.000 đ',
      salary_increase: '1.000.000 đ',
      salary_reduction: '1.000.000 đ',
      salary_total: '1.000.000 đ',
    },
    {
      key: '1',
      name: 'Trinh Van Huan',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      desc: 'Tập Sự',
      timekeeping: '19.0',
      salary: '1.000.000 đ',
      salary_increase: '1.000.000 đ',
      salary_reduction: '1.000.000 đ',
      salary_total: '1.000.000 đ',
    },
    {
      key: '1',
      name: 'Trinh Van Huan',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      desc: 'Tập Sự',
      timekeeping: '19.0',
      salary: '1.000.000 đ',
      salary_increase: '1.000.000 đ',
      salary_reduction: '1.000.000 đ',
      salary_total: '1.000.000 đ',
    },
    {
      key: '1',
      name: 'Trinh Van Huan',
      image: 'https://youngkids-dev.acaziasoft.com/statics/avatar/546/uzui-tengen-meme-face_54179850704676418495.jpeg',
      desc: 'Tập Sự',
      timekeeping: '19.0',
      salary: '1.000.000 đ',
      salary_increase: '1.000.000 đ',
      salary_reduction: '1.000.000 đ',
      salary_total: '1.000.000 đ',
    },
  ];

  const getPayrolls = useCallback(() => {
    dispatch(getEventsAction.request({ params: getPayrollsParamsRequest, headers: { branchIds: currentBranchId } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getPayrollsParamsRequest, currentBranchId]);

  useEffect(() => {
    getPayrolls();
  }, [getPayrolls]);

  return (
    <div className="Payrolls">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Revenues-filter">
            <Row gutter={[16, 16]} justify="space-between">
              <Col>
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
                    <Select label="Loại doanh thu" placeholder="Chọn dữ liệu" allowClear />
                  </Col>
                  <Col>
                    <Select label="Loại thanh toán" placeholder="Chọn dữ liệu" allowClear />
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row gutter={[16, 16]}>
                  <Col>
                    <DatePicker
                      value={moment(getPayrollsParamsRequest.fromDate)}
                      label="Tháng"
                      picker="month"
                      format={EFormat['MM/YYYY']}
                      placeholder=" "
                      onChange={(data: any): void => {
                        setGetPayrollsParamsRequest({
                          ...getPayrollsParamsRequest,
                          page: DEFAULT_PAGE,
                          fromDate: data?.clone()?.startOf('month')?.valueOf(),
                          toDate: data?.clone()?.endOf('month')?.valueOf(),
                        });
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Payrolls-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.PigMoney} color={EIconColor.TUNDORA} />
                      Tổng Tính Lương: <strong>{eventesState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                </Row>
              }
              loading={getPayrollsLoading}
              columns={columns}
              dataSources={dataSources}
              page={getPayrollsParamsRequest?.page}
              pageSize={getPayrollsParamsRequest?.size}
              total={eventesState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Payrolls;
