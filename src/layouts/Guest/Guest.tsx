import React from 'react';

import { TGuestProps } from '@/layouts/Guest/Guest.types';

const Guest: React.FC<TGuestProps> = ({ children }) => {
  return <div className="Guest">{children}</div>;
};

export default Guest;
