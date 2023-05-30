/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { Link, navigate } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';

import { LayoutPaths, Paths } from '@/pages/routers';
import Button, { EButtonStyleType } from '@/components/Button';
import { getFullUrlStatics, showNotification, validationRules } from '@/utils/functions';
import Input from '@/components/Input';
import Checkbox from '@/components/Checkbox';
import Avatar from '@/components/Avatar';
import { ELoginAction, getMyProfileAction, loginAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import Helpers from '@/services/helpers';

import './Login.scss';
import { ETypeNotification } from '@/common/enums';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const rememberAccountData = Helpers.getDataRememberAccount();
  const [isExistedRememberAccount, setIsExistedRememberAccount] = useState(Boolean(rememberAccountData?.username));

  const loginLoading = useSelector((state: TRootState) => state.loadingReducer[ELoginAction.LOGIN]);

  const handleLoginAnotherAccount = (): void => {
    Helpers.setDataRememberAccount({});
    form.resetFields();
    setIsExistedRememberAccount(false);
  };

  const handleSubmit = (values: any): void => {
    const body = {
      username: values?.username || rememberAccountData?.username,
      password: values?.password,
      grant_type: 'password',
      user_type: 'admin',
    };

    dispatch(
      loginAction.request({ body }, (): void => {
        handleLoginSuccess(values);
      }),
    );
  };

  const handleLoginSuccess = (data?: any): void => {
    if (data?.rememberMe) {
      dispatch(
        getMyProfileAction.request({}, (response): void => {
          const storageData = {
            username: response.data.user_name,
            avatar: response.data.avatar,
            name: response.data.name,
          };

          Helpers.setDataRememberAccount(storageData);
        }),
      );
    } else {
      Helpers.setDataRememberAccount({});
    }

    navigate(Paths.Dashboard);
    showNotification(ETypeNotification.SUCCESS, 'Đăng Nhập Thành Công !');
  };

  useEffect(() => {
    if (isExistedRememberAccount) {
      form.setFieldsValue({
        rememberMe: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Login">
      <Form className="Auth-form" form={form} onFinish={handleSubmit}>
        <div className="Auth-form-header">
          <div className="Auth-title" style={{ marginBottom: '0.8rem' }}>
            {isExistedRememberAccount ? 'Chào mừng bạn trở lại!' : 'Đăng nhập'}
          </div>
          <div className="Auth-description">Quản lý hiệu quả hơn với MindStar!</div>
        </div>

        <Row gutter={[16, 16]}>
          {isExistedRememberAccount && (
            <Col span={24}>
              <div className="Auth-avatar text-center">
                <Avatar size={64} image={getFullUrlStatics(rememberAccountData.avatar)} />
                <div className="Auth-description bold">{rememberAccountData.name}</div>
              </div>
            </Col>
          )}

          {!isExistedRememberAccount && (
            <Col span={24}>
              <Form.Item name="username" rules={[validationRules.required()]}>
                <Input label="Tài khoản" size="large" required />
              </Form.Item>
            </Col>
          )}

          <Col span={24}>
            <Form.Item name="password" rules={[validationRules.required()]}>
              <Input label="Mật khẩu" size="large" required type="password" />
            </Form.Item>
          </Col>
          <Col span={24} style={{ marginTop: '0.8rem' }}>
            <Form.Item name="rememberMe">
              <Checkbox label="Nhớ tài khoản ở những lần đăng nhập sau" size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Button
          title="Đăng nhập"
          styleType={EButtonStyleType.PURPLE}
          style={{ margin: '3.2rem 0 3.6rem' }}
          htmlType="submit"
          disabled={loginLoading}
        />
        {isExistedRememberAccount && (
          <Button
            title="Đăng nhập bằng tài khoản khác"
            styleType={EButtonStyleType.PURPLE_TRANSPARENT}
            style={{ margin: '-2rem 0 3.6rem' }}
            onClick={handleLoginAnotherAccount}
          />
        )}
        <Link to={LayoutPaths.Admin} className="Auth-link">
          Quên mật khẩu?
        </Link>
      </Form>
    </div>
  );
};

export default Login;
