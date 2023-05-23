import React from 'react';
import classNames from 'classnames';

import { TStatusProps } from './Status.types.d';
import './Status.scss';

const Status: React.FC<TStatusProps> = ({ label, styleType }) => {
  return (
    <div className={classNames('Status flex items-center', styleType)}>
      <div className="Status-circle" />
      <div className="Status-label">{label}</div>
    </div>
  );
};

export default Status;
