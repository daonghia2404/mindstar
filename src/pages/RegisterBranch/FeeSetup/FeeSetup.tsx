import React from 'react';
import { Col, Form, Row } from 'antd';

import Button, { EButtonStyleType } from '@/components/Button';
import { EIconColor, EIconName } from '@/components/Icon';
import { validationRules } from '@/utils/functions';
import Input from '@/components/Input';
import Select from '@/components/Select';

import { TFeeSetupProps } from './FeeSetup.types';
import './FeeSetup.scss';

const FeeSetup: React.FC<TFeeSetupProps> = ({ onNext }) => {
  const [form] = Form.useForm();

  const handleSubmit = (): void => {
    onNext?.();
  };

  return (
    <Form className="FeeSetup" form={form} onFinish={handleSubmit}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item name="feeModule" rules={[validationRules.required()]}>
            <Select
              label="Mô hình học phí"
              size="large"
              required
              options={[
                { value: '1', label: 'Basic Course' },
                { value: '2', label: 'Advanced Course' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="quanlityCourse" rules={[validationRules.required()]}>
            <Input label="Số lượng buổi học" size="large" required numberic useNumber />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="fee" rules={[validationRules.required()]}>
            <Input label="Học phí" size="large" required numberic useNumber useComma />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="feeKit" rules={[validationRules.required()]}>
            <Input label="Chi phí KIT" size="large" required numberic useNumber useComma />
          </Form.Item>
        </Col>
      </Row>
      <Button
        title="Hoàn thành"
        styleType={EButtonStyleType.PURPLE_TRANSPARENT}
        style={{ margin: '3.2rem 0 0' }}
        iconName={EIconName.ArrowLongRight}
        iconColor={EIconColor.PURPLE_HEART}
        reverse
        htmlType="submit"
      />
    </Form>
  );
};

export default FeeSetup;
