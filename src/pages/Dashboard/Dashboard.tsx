import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import DashboardStaticCard from '@/pages/Dashboard/DashboardStaticCard';
import WeeklySchedule from '@/pages/Dashboard/WeeklySchedule';
import RecentRevenueTable from '@/pages/Dashboard/RecentRevenueTable';
import RecentExpenseTable from '@/pages/Dashboard/RecentExpenseTable';
import { EIconName } from '@/components/Icon';
import RecentRedeemsTable from '@/pages/Dashboard/RecentRedeemsTable';
import RecentOrdersTable from '@/pages/Dashboard/RecentOrdersTable';
import Select, { TSelectOption } from '@/components/Select';
import { TRootState } from '@/redux/reducers';
import {
  getDashboardAction,
  getExpensesAction,
  getOrdersAction,
  getRedeemsAction,
  getSchedulesAction,
  getTransactionsAction,
} from '@/redux/actions';
import { EEmpty } from '@/common/enums';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { beautifyCurrency } from '@/utils/functions';
import { Paths } from '@/pages/routers';

import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  const dashboardState = useSelector((state: TRootState) => state.dashboardReducer.getDashboardResponse)?.data;
  const transactionsState = useSelector((state: TRootState) => state.transactionReducer.getTransactionsResponse)?.data;
  const expensesState = useSelector((state: TRootState) => state.expenseReducer.getExpensesResponse)?.data;
  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;

  const [filterYear, setFilterYear] = useState<TSelectOption | undefined>({
    label: String(moment().year()),
    value: String(moment().year()),
  });

  const paramsYears = {
    fromDate: filterYear?.value
      ? moment({ year: Number(filterYear.value) })
          ?.startOf('year')
          ?.valueOf()
      : undefined,
    toDate: filterYear?.value
      ? moment({ year: Number(filterYear.value) })
          ?.endOf('year')
          ?.valueOf()
      : undefined,
  };

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

  const getDashboard = useCallback(() => {
    dispatch(getDashboardAction.request({ params: { ...paramsYears }, headers: { branchIds: currentBranchId } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filterYear, currentBranchId]);

  const getTransactions = useCallback(() => {
    dispatch(
      getTransactionsAction.request({
        params: { page: DEFAULT_PAGE, size: DEFAULT_PAGE_SIZE / 2, ...paramsYears },
        headers: { branchIds: currentBranchId },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filterYear, currentBranchId]);

  const getExpenses = useCallback(() => {
    dispatch(
      getExpensesAction.request({
        params: { page: DEFAULT_PAGE, size: DEFAULT_PAGE_SIZE / 2, ...paramsYears },
        headers: { branchIds: currentBranchId },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filterYear, currentBranchId]);

  const getOrders = useCallback(() => {
    dispatch(
      getOrdersAction.request({
        params: { page: DEFAULT_PAGE, size: DEFAULT_PAGE_SIZE / 2, ...paramsYears },
        headers: { branchIds: currentBranchId },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filterYear, currentBranchId]);

  const getRedeems = useCallback(() => {
    dispatch(
      getRedeemsAction.request({
        params: { page: DEFAULT_PAGE, size: DEFAULT_PAGE_SIZE / 2, ...paramsYears },
        headers: { branchIds: currentBranchId },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filterYear, currentBranchId]);

  const getSchedules = useCallback(() => {
    dispatch(
      getSchedulesAction.request({
        params: { ...paramsYears },
        headers: { branchIds: currentBranchId },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filterYear, currentBranchId]);

  useEffect(() => {
    getDashboard();
  }, [getDashboard]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  useEffect(() => {
    getSchedules();
  }, [getSchedules]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  useEffect(() => {
    getRedeems();
  }, [getRedeems]);

  return (
    <div className="Dashboard">
      <div className="Dashboard-wrapper">
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Row justify="end">
              <Col>
                <Select label="Năm" options={yearsOptions()} value={filterYear} onChange={setFilterYear} />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[24, 24]}>
              <Col span={12} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
                <DashboardStaticCard
                  title="Doanh thu (đ)"
                  value={beautifyCurrency(transactionsState?.sub_total || EEmpty.ZERO)}
                  icon={EIconName.PigMoney}
                  onClick={(): void => {
                    navigate(Paths.Revenues);
                  }}
                />
              </Col>
              <Col span={12} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
                <DashboardStaticCard
                  title="Chi phí (đ)"
                  value={beautifyCurrency(expensesState?.sub_total || EEmpty.ZERO)}
                  icon={EIconName.Coins}
                  onClick={(): void => {
                    navigate(Paths.Expenses);
                  }}
                />
              </Col>
              <Col span={12} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
                <DashboardStaticCard
                  title="Lớp học"
                  value={dashboardState?.class_count || EEmpty.ZERO}
                  icon={EIconName.ChalkBoard}
                  onClick={(): void => {
                    navigate(Paths.Classes);
                  }}
                />
              </Col>
              <Col span={12} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
                <DashboardStaticCard
                  title="Đơn hàng"
                  value={dashboardState?.order_count || EEmpty.ZERO}
                  icon={EIconName.Receipt}
                  onClick={(): void => {
                    navigate(Paths.Orders);
                  }}
                />
              </Col>
              <Col span={12} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
                <DashboardStaticCard
                  title="Học viên"
                  value={dashboardState?.player_count || EEmpty.ZERO}
                  icon={EIconName.UsersGroup}
                  onClick={(): void => {
                    navigate(Paths.Players);
                  }}
                />
              </Col>
              <Col span={12} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
                <DashboardStaticCard
                  title="Học thử miễn phí"
                  value={dashboardState?.free_trial_count || EEmpty.ZERO}
                  icon={EIconName.Rocket}
                  onClick={(): void => {
                    navigate(Paths.Practices);
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <WeeklySchedule />
          </Col>
          <Col span={24}>
            <Row gutter={[24, 24]}>
              <Col span={24} md={{ span: 12 }}>
                <RecentRevenueTable />
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <RecentExpenseTable />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[24, 24]}>
              <Col span={24} md={{ span: 12 }}>
                <RecentRedeemsTable />
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <RecentOrdersTable />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
