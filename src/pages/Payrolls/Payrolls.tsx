import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from '@reach/router';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { EEmpty, EFormat } from '@/common/enums';
import Card from '@/components/Card';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import Table from '@/components/Table';
import { TRootState } from '@/redux/reducers';
import DatePicker from '@/components/DatePicker';
import Avatar from '@/components/Avatar';
import { Paths } from '@/pages/routers';

import './Payrolls.scss';
import DropdownMenu, { TDropdownMenuItem } from '@/components/DropdownMenu';
import Button, { EButtonStyleType } from '@/components/Button';
import ModalChangeSalaryForm from '@/pages/Payrolls/ModalChangeSalaryForm';

const Payrolls: React.FC = () => {
  const dispatch = useDispatch();

  const [changeSalaryFormModalState, setChangeSalaryFormModalState] = useState<{ visible: boolean; data?: any }>({
    visible: false,
  });
  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getPayrollsLoading = false;

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
      search: keyword,
    });
  };

  const handleOpenChangeSalaryFormModal = (): void => {
    setChangeSalaryFormModalState({ visible: true });
  };
  const handleCloseChangeSalaryFormModal = (): void => {
    setChangeSalaryFormModalState({ visible: false });
  };

  const dataTableDropdownActions = (): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa Khoản Lương',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenChangeSalaryFormModal();
      },
    },
  ];

  const columns = [
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: '',
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-image">
            <Avatar shape="circle" size={48} image={record?.image} />
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
            <Link to={Paths.ManagerDetail('1')} className="Table-info-title">
              {record?.name}
            </Link>
            <div className="Table-info-description">{record?.desc}</div>
          </div>
        );
      },
    },
    {
      key: 'timeKeeping',
      dataIndex: 'timeKeeping',
      title: 'Chấm Công',
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.timekeeping}</div>
          </div>
        );
      },
    },
    {
      key: 'basicSalary',
      dataIndex: 'basicSalary',
      title: 'Lương Cơ Bản',
      render: (_: string, record: any): string => record?.salary || EEmpty.DASH,
    },
    {
      key: 'salaryIncrease',
      dataIndex: 'salaryIncrease',
      title: 'Khoản Tăng Lương',
      render: (_: string, record: any): string => record?.salary_increase || EEmpty.DASH,
    },
    {
      key: 'salaryReduction',
      dataIndex: 'salaryReduction',
      title: 'Khoản Giảm Lương',
      render: (_: string, record: any): string => record?.salary_reduction || EEmpty.DASH,
    },
    {
      key: 'totalSalary',
      dataIndex: 'totalSalary',
      title: 'Tổng Lương',
      render: (_: string, record: any): string => record?.salary_total || EEmpty.DASH,
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (): React.ReactElement => (
        <div onClick={(e): void => e.stopPropagation()}>
          <DropdownMenu placement="bottomRight" options={dataTableDropdownActions()}>
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
    // dispatch(getEventsAction.request({ params: getPayrollsParamsRequest, headers: { branchIds: currentBranchId } }));
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
                <Row gutter={[16, 16]} align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.Users} color={EIconColor.TUNDORA} />
                      Tổng Giáo Viên: <strong>{4 || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.PigMoney} color={EIconColor.TUNDORA} />
                      Tổng Lương: <strong>{'4.000.000 đ' || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                </Row>
              }
              loading={getPayrollsLoading}
              columns={columns}
              dataSources={dataSources}
              page={getPayrollsParamsRequest?.page}
              pageSize={getPayrollsParamsRequest?.size}
              total={4}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>

      <ModalChangeSalaryForm
        {...changeSalaryFormModalState}
        onClose={handleCloseChangeSalaryFormModal}
        onSuccess={getPayrolls}
      />
    </div>
  );
};

export default Payrolls;
