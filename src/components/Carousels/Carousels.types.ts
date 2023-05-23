export type TCarouselsProps = {
  dots?: boolean;
  arrows?: boolean;
  infinite?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  autoplay?: boolean;
  slidesPerRow?: number;
  variableWidth?: boolean;
  responsive?: Array<any>;
  onDragging?: (dragging: boolean) => void;
};
