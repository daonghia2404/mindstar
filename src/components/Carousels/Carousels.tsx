import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';

import Button, { EButtonStyleType } from '@/components/Button';
import { EIconColor, EIconName } from '@/components/Icon';

import { TCarouselsProps } from './Carousels.types';
import './Carousels.scss';

const Carousels: React.FC<TCarouselsProps> = ({
  dots = true,
  arrows = true,
  infinite = true,
  slidesToShow = 1,
  slidesToScroll = 1,
  slidesPerRow = 1,
  responsive = [],
  autoplay,
  variableWidth = false,
  onDragging,
  children,
}) => {
  const renderPrevArrow = (): React.ReactElement => {
    return (
      <Button
        size="small"
        iconName={EIconName.AngleLeft}
        iconColor={EIconColor.DOVE_GRAY}
        className="Carousels-arrow prev"
        styleType={EButtonStyleType.GENERAL_FORM}
      />
    );
  };

  const renderNextArrow = (): React.ReactElement => {
    return (
      <Button
        size="small"
        iconName={EIconName.AngleRight}
        iconColor={EIconColor.DOVE_GRAY}
        className="Carousels-arrow next"
        styleType={EButtonStyleType.GENERAL_FORM}
      />
    );
  };

  const settings = {
    speed: 500,
    dots,
    arrows,
    infinite,
    autoplay,
    slidesPerRow,
    autoplaySpeed: 5000,
    slidesToShow,
    variableWidth,
    slidesToScroll,
    responsive,
    swipeToSlide: true,
    nextArrow: renderNextArrow(),
    prevArrow: renderPrevArrow(),
    beforeChange: (): void => onDragging?.(true),
    afterChange: (): void => onDragging?.(false),
  };
  return (
    <div className={classNames('Carousels')}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default Carousels;
