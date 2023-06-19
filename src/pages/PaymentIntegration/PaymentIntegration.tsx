import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Card from '@/components/Card';
import Input from '@/components/Input';
import { showNotification, validationRules } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import { EUpdateSettingsAction, getSettingsAction, updateSettingsAction } from '@/redux/actions';
import { ETypeNotification } from '@/common/enums';
import { Paths } from '@/pages/routers';
import Switch from '@/components/Switch';

import './PaymentIntegration.scss';

const PaymentIntegration: React.FC = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState<any>({});

  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data
    ?.payment_settings;
  const updateSettingsLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateSettingsAction.UPDATE_SETTINGS],
  );
  const [form] = Form.useForm();

  const handleBack = (): void => {
    navigate(Paths.SettingsGeneral);
  };

  const handleSubmit = (values: any): void => {
    const body = {
      payment_settings: {
        ninepay_payment_settings: {
          callback_url: values?.callbackUrl,
          checksum_key: values?.checksum,
          is_active_function: values?.enable9Pay,
          merchant_key: values?.clientId,
          merchant_secret_key: values?.secretKey,
          nine_pay_end_point: values?.endpoint,
        },
        payment_list: settingsState?.payment_list,
      },
    };

    dispatch(updateSettingsAction.request({ body }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    getSettings();
    showNotification(ETypeNotification.SUCCESS, 'Cập Nhật Cấu Hình Thành Công !');
  };

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getSettings = (): void => {
    dispatch(getSettingsAction.request({ headers: { branchIds: currentBranchId } }));
  };

  useEffect(() => {
    if (settingsState) {
      const dataChanged = {
        callbackUrl: settingsState?.ninepay_payment_settings?.callback_url,
        checksum: settingsState?.ninepay_payment_settings?.checksum_key,
        enable9Pay: settingsState?.ninepay_payment_settings?.is_active_function,
        clientId: settingsState?.ninepay_payment_settings?.merchant_key,
        secretKey: settingsState?.ninepay_payment_settings?.merchant_secret_key,
        endpoint: settingsState?.ninepay_payment_settings?.nine_pay_end_point,
      };
      form.setFieldsValue(dataChanged);
      setFormValues({ ...formValues, ...dataChanged });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, settingsState]);

  return (
    <Form
      form={form}
      className="PaymentIntegration"
      onFinish={handleSubmit}
      onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}
    >
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col>
              <div className="Admin-back" onClick={handleBack}>
                <Icon name={EIconName.ArrowLongLeft} color={EIconColor.DOVE_GRAY} />
                Quay lại
              </div>
            </Col>
            <Col>
              <Row gutter={[16, 16]}>
                <Col>
                  <Button
                    title="Lưu"
                    htmlType="submit"
                    styleType={EButtonStyleType.PURPLE}
                    iconName={EIconName.DeviceFloppy}
                    iconColor={EIconColor.WHITE}
                    disabled={updateSettingsLoading}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Card title="Thông số" description="Thiết lập các giá trị thanh toán bên thứ 3 (9Pay).">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item name="enable9Pay">
                  <Switch label="Kích hoạt 9Pay" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="clientId" rules={formValues?.enable9Pay ? [validationRules.required()] : undefined}>
                  <Input
                    label="Client ID"
                    placeholder="Nhập dữ liệu"
                    active
                    required={formValues?.enable9Pay}
                    disabled={!formValues?.enable9Pay}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="secretKey" rules={formValues?.enable9Pay ? [validationRules.required()] : undefined}>
                  <Input
                    label="Secret Key"
                    placeholder="Nhập dữ liệu"
                    active
                    required={formValues?.enable9Pay}
                    disabled={!formValues?.enable9Pay}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="checksum" rules={formValues?.enable9Pay ? [validationRules.required()] : undefined}>
                  <Input
                    label="Checksum"
                    placeholder="Nhập dữ liệu"
                    active
                    required={formValues?.enable9Pay}
                    disabled={!formValues?.enable9Pay}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="endpoint"
                  rules={formValues?.enable9Pay ? [validationRules.required(), validationRules.url()] : undefined}
                >
                  <Input
                    label="Endpoint"
                    placeholder="Nhập dữ liệu"
                    active
                    required={formValues?.enable9Pay}
                    disabled={!formValues?.enable9Pay}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="callbackUrl"
                  rules={formValues?.enable9Pay ? [validationRules.required(), validationRules.url()] : undefined}
                >
                  <Input
                    label="Callback URL"
                    placeholder="Nhập dữ liệu"
                    active
                    required={formValues?.enable9Pay}
                    disabled={!formValues?.enable9Pay}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default PaymentIntegration;
