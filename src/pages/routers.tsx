/* eslint-disable react/require-default-props */
import React, { lazy, Suspense } from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';

import Helpers from '@/services/helpers';
import Loading from '@/components/Loading';

const retryLoadComponent = (fn: () => Promise<unknown>, retriesLeft = 5, interval = 1000): any =>
  new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            reject(error);
            return;
          }

          retryLoadComponent(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });

const Home = lazy(() => retryLoadComponent(() => import('@/pages/Home')));

const Dashboard = lazy(() => retryLoadComponent(() => import('@/pages/Dashboard')));
const RegisterBranch = lazy(() => retryLoadComponent(() => import('@/pages/RegisterBranch')));
const Branches = lazy(() => retryLoadComponent(() => import('@/pages/Branches')));
const TimeOffs = lazy(() => retryLoadComponent(() => import('@/pages/TimeOffs')));
const Managers = lazy(() => retryLoadComponent(() => import('@/pages/Managers')));
const ManagerDetail = lazy(() => retryLoadComponent(() => import('@/pages/ManagerDetail')));
const Classes = lazy(() => retryLoadComponent(() => import('@/pages/Classes')));
const ClassDetail = lazy(() => retryLoadComponent(() => import('@/pages/ClassDetail')));
const Events = lazy(() => retryLoadComponent(() => import('@/pages/Events')));
const Connects = lazy(() => retryLoadComponent(() => import('@/pages/Connects')));
const PlayerDetail = lazy(() => retryLoadComponent(() => import('@/pages/PlayerDetail')));
const Players = lazy(() => retryLoadComponent(() => import('@/pages/Players')));
const Attendances = lazy(() => retryLoadComponent(() => import('@/pages/Attendances')));
const Practices = lazy(() => retryLoadComponent(() => import('@/pages/Practices')));
const Schedules = lazy(() => retryLoadComponent(() => import('@/pages/Schedules')));
const Categories = lazy(() => retryLoadComponent(() => import('@/pages/Categories')));
const Rewards = lazy(() => retryLoadComponent(() => import('@/pages/Rewards')));
const Products = lazy(() => retryLoadComponent(() => import('@/pages/Products')));
const Redeems = lazy(() => retryLoadComponent(() => import('@/pages/Redeems')));
const SettingsGeneral = lazy(() => retryLoadComponent(() => import('@/pages/SettingsGeneral')));
const Users = lazy(() => retryLoadComponent(() => import('@/pages/Users')));
const Customers = lazy(() => retryLoadComponent(() => import('@/pages/Customers')));
const Suppliers = lazy(() => retryLoadComponent(() => import('@/pages/Suppliers')));
const Revenues = lazy(() => retryLoadComponent(() => import('@/pages/Revenues')));
const Expenses = lazy(() => retryLoadComponent(() => import('@/pages/Expenses')));
const BusStops = lazy(() => retryLoadComponent(() => import('@/pages/BusStops')));
const PickupAttendances = lazy(() => retryLoadComponent(() => import('@/pages/PickupAttendances')));
const Order = lazy(() => retryLoadComponent(() => import('@/pages/Order')));

const Login = lazy(() => retryLoadComponent(() => import('@/pages/Login')));
const LoginDomain = lazy(() => retryLoadComponent(() => import('@/pages/LoginDomain')));
const Register = lazy(() => retryLoadComponent(() => import('@/pages/Register')));

export const LayoutPaths = {
  Guest: '/guest',
  Auth: '/auth',
  Admin: '/',
};

export const ModulePaths = {};

export const Paths = {
  Home: '/',
  TimeOffs: '/time-offs',
  Dashboard: '/',
  RegisterBranch: '/register-branch',
  Branches: '/branches',
  Managers: '/managers',
  ManagerDetail: (id?: string): string => `/managers/${id || ':id'}`,
  Classes: '/classes',
  ClassDetail: (id?: string): string => `/classes/${id || ':id'}`,
  Events: '/events',
  Players: '/players',
  PlayerDetail: (id?: string): string => `/players/${id || ':id'}`,
  Connects: '/connects',
  AttendancesPlayers: '/attendances/players',
  AttendancesManagers: '/attendances/managers',
  Practices: '/practices',
  Schedules: '/schedules',
  Order: '/order',
  Categories: '/categories',
  Rewards: '/rewards',
  Products: '/products',
  Redeems: '/redeems',
  SettingsGeneral: '/settings/general',
  Users: '/users',
  Customers: '/customers',
  Suppliers: '/suppliers',
  Revenues: '/revenues',
  Expenses: '/expenses',
  BusStops: '/transports',
  PickupAttendances: '/transports/attendances',

  Login: '/',
  LoginDomain: '/login-domain',
  Register: '/register',
  Rest: '*',
};

export const Pages = {
  Home,
  TimeOffs,
  Dashboard,
  RegisterBranch,
  Branches,
  Managers,
  Redeems,
  Order,
  ManagerDetail,
  Classes,
  ClassDetail,
  Events,
  Players,
  PlayerDetail,
  Connects,
  Attendances,
  Practices,
  Schedules,
  Categories,
  Rewards,
  Products,
  SettingsGeneral,
  Users,
  Customers,
  Suppliers,
  Revenues,
  Expenses,
  BusStops,
  PickupAttendances,

  Login,
  LoginDomain,
  Register,
};

interface IRouteProps extends RouteComponentProps {
  component: React.FC;
  managers?: boolean;
}

export const AuthRoute: React.FC<IRouteProps> = ({ component: Component, ...rest }) => {
  const loggedIn: string | any = Helpers.getAccessToken();

  return loggedIn ? (
    <Redirect noThrow from={Paths.Rest} to={LayoutPaths.Admin} />
  ) : (
    <Suspense fallback={<Loading />}>
      <Component {...rest} />
    </Suspense>
  );
};

export const ProtectedRoute: React.FC<IRouteProps> = ({ component: Component, ...rest }) => {
  const loggedIn: string | any = Helpers.getAccessToken();

  return loggedIn ? (
    <Suspense fallback={<Loading />}>
      <Component {...rest} />
    </Suspense>
  ) : (
    <Redirect noThrow from={Paths.Rest} to={LayoutPaths.Auth} />
  );
};

export const PublicRoute: React.FC<IRouteProps> = ({ component: Component, ...rest }) => (
  <Suspense fallback={<Loading />}>
    <Component {...rest} />
  </Suspense>
);
