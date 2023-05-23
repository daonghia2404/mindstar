import React from 'react';
import classNames from 'classnames';

import Icon, { EIconColor, EIconName } from '@/components/Icon';

import { TStepStarProps } from './StepStar.types.d';
import './StepStar.scss';

const StepStar: React.FC<TStepStarProps> = ({ value, options = [], onChange }) => {
  return (
    <div className="StepStar flex items-center justify-center">
      {options.map((option, optionIndex) => {
        const isActive = value?.value === option.value;
        const isPassed = optionIndex < options.findIndex((item) => item.value === value?.value);

        let colorIcon;

        switch (true) {
          case isActive:
            colorIcon = EIconColor.PURPLE_HEART;
            break;
          case isPassed:
            colorIcon = EIconColor.APPLE;
            break;
          default:
            colorIcon = EIconColor.SILVER;
            break;
        }

        return (
          <>
            {optionIndex !== 0 && <div className="StepStar-line" style={{ background: colorIcon }} />}

            <div
              className={classNames('StepStar-item flex items-center', {
                active: isActive,
                passed: isPassed,
                'cursor-pointer': isPassed,
              })}
              onClick={(): void => {
                if (isPassed) onChange?.(option);
              }}
            >
              <div className="StepStar-item-icon">
                <Icon name={EIconName.StarOutline} color={colorIcon} />
                <span style={{ color: colorIcon }}>
                  {isPassed ? <Icon name={EIconName.Check} color={colorIcon} /> : optionIndex + 1}
                </span>
              </div>
              <div className="StepStar-item-title" style={{ color: colorIcon }}>
                {option.label}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default StepStar;
