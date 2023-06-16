import React from 'react';
import classNames from 'classnames';

import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Button, { EButtonStyleType } from '@/components/Button';

import { TPriceCardProps } from './PriceCard.types.d';
import './PriceCard.scss';

const PriceCard: React.FC<TPriceCardProps> = ({ listFeature, price, title, type, hightlight, listSetup }) => {
  return (
    <div className={classNames('PriceCard', type, { hightlight })}>
      <div className="PriceCard-title">{title}</div>
      <div className="PriceCard-line-wave">
        <svg width="48" height="6" viewBox="0 0 48 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M46.3459 3C43.0989 5.66667 38.4199 5.66667 35.1729 3C31.9259 0.333333 27.2468 0.333333 23.9998 3C20.7528 5.66667 16.0738 5.66667 12.8268 3C9.57983 0.333333 4.90081 0.333333 1.65381 3"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="PriceCard-price">
        <div className="PriceCard-price-title">{price}</div>
        <div className="PriceCard-price-description">đ/tháng</div>
      </div>
      <div className="PriceCard-list">
        {listFeature?.map((item) => (
          <div className="PriceCard-list-item flex items-center">
            <Icon name={EIconName.Check} color={EIconColor.APPLE} />
            {item.label}
          </div>
        ))}
      </div>
      <div className="PriceCard-line" />
      <div className="PriceCard-subtitle">Phí cài đặt & Platform</div>
      <div className="PriceCard-price-setup">
        <div className="PriceCard-price-setup-title">20.000.000đ</div>
        <div className="PriceCard-price-setup-description">Thanh toán 1 lần</div>
      </div>
      <div className="PriceCard-list">
        {listSetup?.map((item) => (
          <div className="PriceCard-list-item flex items-center">
            <Icon name={EIconName.Check} color={EIconColor.APPLE} />
            {item.label}
          </div>
        ))}
      </div>
      <div className="PriceCard-btn">
        <Button title="Đăng ký ngay" styleType={EButtonStyleType.PURPLE_TRANSPARENT} />
      </div>
    </div>
  );
};

export default PriceCard;
