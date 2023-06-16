/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Col, Row } from 'antd';
import { navigate } from '@reach/router';

import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { Paths } from '@/pages/routers';
import './PlanPackages.scss';
import { dataPackages } from '@/pages/PlanPackages/PlanPackages.data';
import PriceCard from '@/components/PriceCard';

const PlanPackages: React.FC = () => {
  const handleBack = (): void => {
    navigate(Paths.MyPlan);
  };

  return (
    <div className="PlanPackages">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col>
              <div className="Admin-back" onClick={handleBack}>
                <Icon name={EIconName.ArrowLongLeft} color={EIconColor.DOVE_GRAY} />
                Quay lại
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            {dataPackages.map((item) => (
              <Col key={item.type} span={24} sm={{ span: 12 }} xl={{ span: 6 }}>
                <PriceCard {...item} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default PlanPackages;
