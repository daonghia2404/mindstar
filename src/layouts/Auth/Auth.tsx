/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { TAuthProps } from '@/layouts/Auth/Auth.types';
import LogoDark from '@/assets/images/logo-dark.svg';

import './Auth.scss';

const Auth: React.FC<TAuthProps> = ({ children }) => {
  return (
    <div className="Auth">
      <div className="Auth-header">
        <div className="container">
          <div className="Auth-header-wrapper flex items-center">
            <a className="Auth-header-logo" href="#">
              <img src={LogoDark} alt="" />
            </a>
          </div>
        </div>
      </div>
      <div className="Auth-body">{children}</div>
    </div>
  );
};

export default Auth;
