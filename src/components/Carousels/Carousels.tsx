import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';

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
  // const renderPrevArrow = (): React.ReactElement => {
  //   return <Button size="small" className="Carousels-arrow prev" />;
  // };

  // const renderNextArrow = (): React.ReactElement => {
  //   return <Button size="small" className="Carousels-arrow next" />;
  // };

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
    // nextArrow: renderNextArrow(),
    // prevArrow: renderPrevArrow(),
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
