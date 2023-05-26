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
const Breaks = lazy(() => retryLoadComponent(() => import('@/pages/Breaks')));
const Managers = lazy(() => retryLoadComponent(() => import('@/pages/Managers')));
const ManagerDetail = lazy(() => retryLoadComponent(() => import('@/pages/ManagerDetail')));

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
  Breaks: '/breaks',
  Dashboard: '/',
  RegisterBranch: '/register-branch',
  Branches: '/branches',
  Managers: '/managers',
  ManagerDetail: (id?: string): string => `/managers/${id || ':id'}`,

  Login: '/',
  LoginDomain: '/login-domain',
  Register: '/register',

  Rest: '*',
};

export const Pages = {
  Home,
  Breaks,
  Dashboard,
  RegisterBranch,
  Branches,
  Managers,
  ManagerDetail,

  Login,
  LoginDomain,
  Register,
};

interface IRouteProps extends RouteComponentProps {
  component: React.FC;
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
