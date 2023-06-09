import React, { useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Card from '@/components/Card';
import Select from '@/components/Select';
import { dataPricingModelOptions } from '@/common/constants';
import Input from '@/components/Input';
import { showNotification, validationRules } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import { EUpdateSettingsAction, getSettingsAction, updateSettingsAction } from '@/redux/actions';
import { ETypeNotification } from '@/common/enums';
import { Paths } from '@/pages/routers';

import './PricingModel.scss';

const PricingModel: React.FC = () => {
  const dispatch = useDispatch();

  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data
    ?.transaction_settings;
  const updateSettingsLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateSettingsAction.UPDATE_SETTINGS],
  );
  const [form] = Form.useForm();

  const handleBack = (): void => {
    navigate(Paths.SettingsGeneral);
  };

  const handleSubmit = (values: any): void => {
    const body = {
      transaction_settings: {
        fee_transaction_type_default: values?.pricingModel?.value,
        fee_transaction_duration_in_units: values?.totalLesson,
        fee_transaction_duration_in_days: values?.expire,
        fee_transaction_value: values?.membershipFee,
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
      form.setFieldsValue({
        pricingModel: dataPricingModelOptions.find(
          (item) => item.value === settingsState?.fee_transaction_type_default,
        ),
        totalLesson: settingsState?.fee_transaction_duration_in_units,
        expire: settingsState?.fee_transaction_duration_in_days,
        membershipFee: settingsState?.fee_transaction_value,
      });
    }
  }, [form, settingsState]);

  return (
    <Form form={form} className="PricingModel" onFinish={handleSubmit}>
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
          <Card title="Thông số" description="Thiết lập các giá trị mặc định của một khoá học.">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item name="pricingModel" rules={[validationRules.required()]}>
                  <Select
                    label="Mẫu định giá"
                    required
                    active
                    options={dataPricingModelOptions}
                    disabled
                    placeholder="Chọn dữ liệu"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="totalLesson" rules={[validationRules.required()]}>
                  <Input label="Số buổi học" required active placeholder="Nhập dữ liệu" numberic useNumber />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Row gutter={[16, 16]} wrap={false}>
                  <Col flex={1}>
                    <Form.Item name="expire" rules={[validationRules.required()]}>
                      <Input
                        label="Ngày hết hạn"
                        required
                        active
                        placeholder="Nhập dữ liệu"
                        numberic
                        useNumber
                        suffixText="ngày"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Form.Item name="membershipFee" rules={[validationRules.required()]}>
                  <Input
                    label="Học phí"
                    required
                    active
                    placeholder="Nhập dữ liệu"
                    numberic
                    useNumber
                    useComma
                    suffixText="đ"
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

export default PricingModel;
