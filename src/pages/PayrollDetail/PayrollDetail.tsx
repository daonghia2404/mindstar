import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, navigate } from '@reach/router';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { EEmpty } from '@/common/enums';
import Card from '@/components/Card';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import Table from '@/components/Table';
import { TRootState } from '@/redux/reducers';
import Avatar from '@/components/Avatar';
import { Paths } from '@/pages/routers';
import Button, { EButtonStyleType } from '@/components/Button';

import './PayrollDetail.scss';

const PayrollDetail: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getPayrollDetailLoading = false;

  const [getPayrollDetailParamsRequest, setGetPayrollDetailParamsRequest] = useState<any>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
  });

  const handleBack = (): void => {
    navigate(Paths.Payrolls);
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetPayrollDetailParamsRequest({
      ...getPayrollDetailParamsRequest,
      page,
      size,
      sort,
    });
  };

  const columns = [
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: '',
      width: 48,
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
      render: (): React.ReactElement => (
        <Input placeholder="Nhập dữ liệu" active label="Số tiền" numberic useComma useNumber suffixText="đ" />
      ),
    },
    {
      key: 'salaryReduction',
      dataIndex: 'salaryReduction',
      title: 'Khoản Giảm Lương',
      render: (): React.ReactElement => (
        <Input placeholder="Nhập dữ liệu" active label="Số tiền" numberic useComma useNumber suffixText="đ" />
      ),
    },
    {
      key: 'totalSalary',
      dataIndex: 'totalSalary',
      title: 'Tổng Lương',
      render: (_: string, record: any): string => record?.salary_total || EEmpty.DASH,
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

  const getPayrollDetail = useCallback(() => {
    // dispatch(getEventsAction.request({ params: getPayrollDetailParamsRequest, headers: { branchIds: currentBranchId } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getPayrollDetailParamsRequest, currentBranchId]);

  useEffect(() => {
    getPayrollDetail();
  }, [getPayrollDetail]);

  return (
    <div className="PayrollDetail">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col>
              <div className="Admin-back" onClick={handleBack}>
                <Icon name={EIconName.ArrowLongLeft} color={EIconColor.DOVE_GRAY} />
                Quay lại
              </div>
            </Col>
            <Col>
              <Row gutter={[16, 16]}>
                <Col>
                  <Button
                    title="Lưu"
                    htmlType="submit"
                    styleType={EButtonStyleType.PURPLE}
                    iconName={EIconName.DeviceFloppy}
                    iconColor={EIconColor.WHITE}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Card className="PayrollDetail-table">
            <Table
              header={
                <Row gutter={[16, 16]} align="middle" justify="space-between">
                  <Col>
                    <Row gutter={[16, 16]}>
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
                  </Col>
                </Row>
              }
              loading={getPayrollDetailLoading}
              columns={columns}
              dataSources={dataSources}
              page={getPayrollDetailParamsRequest?.page}
              pageSize={getPayrollDetailParamsRequest?.size}
              total={4}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PayrollDetail;
