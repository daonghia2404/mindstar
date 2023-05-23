import React from 'react';
import { Col, Form, Row } from 'antd';
import { Link } from '@reach/router';

import { LayoutPaths } from '@/pages/routers';
import Button, { EButtonStyleType } from '@/components/Button';
import { EIconName } from '@/components/Icon';
import { validationRules } from '@/utils/functions';
import Input from '@/components/Input';
import Checkbox from '@/components/Checkbox';

import './Register.scss';

const Register: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div className="Register">
      <Form className="Auth-form" form={form}>
        <div className="Auth-form-header">
          <div className="Auth-title" style={{ marginBottom: '0.8rem' }}>
            Đăng ký tài khoản
          </div>
          <div className="Auth-description">Sử dụng thử miễn phí trong 14 ngày</div>
        </div>

        <Button
          title="Đăng ký với tài khoản Google"
          size="large"
          styleType={EButtonStyleType.GENERAL_FORM}
          iconName={EIconName.Google}
        />
        <div className="Auth-description small" style={{ margin: '1.2rem 0' }}>
          hoặc
        </div>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item name="name" rules={[validationRules.required()]}>
              <Input label="Họ tên" size="large" required />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="businessName" rules={[validationRules.required()]}>
              <Input label="Tên doanh nghiệp" size="large" required />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="email" rules={[validationRules.required(), validationRules.email()]}>
              <Input label="Email" size="large" required />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="password" rules={[validationRules.required(), validationRules.minLength(8)]}>
              <Input label="Mật khẩu" size="large" required type="password" />
            </Form.Item>
          </Col>
          <Col span={24} style={{ marginTop: '1.6rem' }}>
            <Form.Item name="acceptPolicy" rules={[validationRules.required()]}>
              <Checkbox label="Tôi đồng ý với Điều khoản Dịch vụ và Chính sách bảo mật." size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Button
          title="Bắt đầu sử dụng thử"
          disabled
          styleType={EButtonStyleType.PURPLE}
          style={{ margin: '3.2rem 0 3.6rem' }}
        />
        <Link to={LayoutPaths.Admin} className="Auth-link">
          Tôi đã có tài khoản
        </Link>
      </Form>
    </div>
  );
};

export default Register;
