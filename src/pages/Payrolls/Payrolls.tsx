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
import { Paths } from '@/pages/routers';
import DropdownMenu, { TDropdownMenuItem } from '@/components/DropdownMenu';
import Button, { EButtonStyleType } from '@/components/Button';
import Status, { EStatusStyleType } from '@/components/Status';

import './Payrolls.scss';

const Payrolls: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getPayrollsLoading = false;

  const [getPayrollsParamsRequest, setGetPayrollsParamsRequest] = useState<any>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
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

  const dataTableDropdownActions = (): TDropdownMenuItem[] => [
    {
      value: 'view',
      label: 'Chi Tiết',
      icon: EIconName.Eye,
      onClick: (): void => {
        navigate(Paths.PayrollDetail(String('1')));
      },
    },
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {},
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {},
    },
  ];

  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Phiếu lương',
      className: 'limit-width',
      render: (): React.ReactElement => {
        return (
          <Link to={Paths.PayrollDetail('1')} className="Table-link">
            Lương tháng 05/2023
          </Link>
        );
      },
    },
    {
      key: 'totalSalary',
      dataIndex: 'totalSalary',
      title: 'Tổng Thanh Toán Lương',
      sorter: true,
      render: (): string => `80.000.000đ`,
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      render: (): React.ReactElement => {
        return <Status label="Đã thanh toán" styleType={EStatusStyleType.SUCCESS} />;
      },
    },
    {
      key: 'createDate',
      dataIndex: 'createDate',
      title: 'Ngày Tạo',
      className: 'nowrap',
      sorter: true,
      render: (): string => `30/12/2023`,
    },
    {
      key: 'description',
      dataIndex: 'description',
      title: 'Ghi chú',
      render: (value: string): string => value || EEmpty.DASH,
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
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Payrolls-table">
            <Table
              header={
                <Row gutter={[16, 16]} align="middle" justify="space-between">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.Ticket} color={EIconColor.TUNDORA} />
                      Tổng Phiếu Lương: <strong>{'4' || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      title="Tạo mới Phiếu lương"
                      styleType={EButtonStyleType.PURPLE}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                    />
                  </Col>
                </Row>
              }
              loading={getPayrollsLoading}
              columns={columns}
              dataSources={[1, 2, 3, 4, 5]}
              page={getPayrollsParamsRequest?.page}
              pageSize={getPayrollsParamsRequest?.size}
              total={4}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Payrolls;
