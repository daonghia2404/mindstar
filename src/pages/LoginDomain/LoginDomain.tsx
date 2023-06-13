/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Col, Form, Row } from 'antd';
import { Link } from '@reach/router';

import { LayoutPaths, Paths } from '@/pages/routers';
import Button, { EButtonStyleType } from '@/components/Button';
import { validationRules } from '@/utils/functions';
import Input from '@/components/Input';
import Tooltip from '@/components/Tooltip';
import Icon, { EIconColor, EIconName } from '@/components/Icon';

import './LoginDomain.scss';

const LoginDomain: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div className="LoginDomain">
      <Form className="Auth-form" form={form}>
        <div className="Auth-form-header">
          <div className="Auth-title" style={{ marginBottom: '0.8rem' }}>
            Đăng nhập
          </div>
          <div className="Auth-description">Hãy nhập tên miền trang quản lý của bạn</div>
        </div>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item name="domain" rules={[validationRules.required()]}>
              <Input label="Tên miền" size="large" required suffixText=".mindstar.com" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row justify="space-between" align="middle">
              <Col>
                <Tooltip
                  title="Tên miền được cung cấp trong mail khi bạn đăng ký tài khoản với MindStar. Vui lòng kiểm tra lại mail đăng ký hoặc click vào nút Hỗ trợ ở bên phải để nhận hỗ trợ trực tiếp."
                  placement="bottom"
                >
                  <div className="Auth-tooltip flex items-center">
                    <Icon name={EIconName.QuestionCircle} color={EIconColor.DOVE_GRAY} />
                    <div className="Auth-description small">Tên miền lấy ở đâu?</div>
                  </div>
                </Tooltip>
              </Col>
              <Col>
                <a href="#" className="Auth-link underline" style={{ fontWeight: 400 }} target="_blank">
                  Hỗ trợ
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
        <Button title="Tiếp tục" disabled styleType={EButtonStyleType.PURPLE} style={{ margin: '3.2rem 0 3.6rem' }} />
        <Link to={`${LayoutPaths.Admin}${Paths.Register}`} className="Auth-link">
          Tôi chưa có tài khoản
        </Link>
      </Form>
    </div>
  );
};

export default LoginDomain;
