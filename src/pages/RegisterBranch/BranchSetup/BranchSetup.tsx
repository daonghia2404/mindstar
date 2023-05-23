import React from 'react';
import { Col, Form, Row } from 'antd';

import Button, { EButtonStyleType } from '@/components/Button';
import { EIconColor, EIconName } from '@/components/Icon';
import { validationRules } from '@/utils/functions';
import Input from '@/components/Input';
import Select from '@/components/Select';

import { TBranchSetupProps } from './BranchSetup.types';
import './BranchSetup.scss';

const BranchSetup: React.FC<TBranchSetupProps> = ({ onNext }) => {
  const [form] = Form.useForm();

  const handleSubmit = (): void => {
    onNext?.();
  };

  return (
    <Form className="BranchSetup" form={form} onFinish={handleSubmit}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item name="nameBranch" rules={[validationRules.required()]}>
            <Input label="Tên chi nhánh" size="large" required />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="addressBranch" rules={[validationRules.required()]}>
            <Input label="Địa chỉ chi nhánh" size="large" required />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="city" rules={[validationRules.required()]}>
            <Select
              label="Tên chi nhánh"
              size="large"
              required
              options={[
                { value: '1', label: 'Young Kids Long Biên' },
                { value: '2', label: 'Young Kids Ecopark' },
                { value: '3', label: 'Young Kids Gia Lâm' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="phoneNumber" rules={[validationRules.required()]}>
            <Input label="Số điện thoại" size="large" required numberic />
          </Form.Item>
        </Col>
      </Row>
      <Button
        title="Tiếp tục"
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

export default BranchSetup;
