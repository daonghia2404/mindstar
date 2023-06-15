import React, { useEffect } from 'react';
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
import { EPointActionType, ETypeNotification } from '@/common/enums';
import { Paths } from '@/pages/routers';
import { dataPointActionOptions } from '@/common/constants';

import './EarnPoints.scss';

const EarnPoints: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data
    ?.point_settings;
  const updateSettingsLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateSettingsAction.UPDATE_SETTINGS],
  );
  const handleBack = (): void => {
    navigate(Paths.SettingsGeneral);
  };

  const handleSubmit = (values: any): void => {
    const body = {
      point_settings: {
        actions: settingsState?.actions?.map((item) => ({
          ...item,
          value: values[item.id] || 0,
        })),
        level: settingsState?.level,
      },
    };

    dispatch(updateSettingsAction.request({ body }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    getSettings();
    showNotification(ETypeNotification.SUCCESS, 'Cập nhật cấu hình thành công !');
  };

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getSettings = (): void => {
    dispatch(getSettingsAction.request({ headers: { branchIds: currentBranchId } }));
  };

  useEffect(() => {
    if (settingsState) {
      const dataChanged = settingsState?.actions?.reduce((result, item) => {
        return {
          ...result,
          [`${item.id}`]: item.value,
        };
      }, {});
      form.setFieldsValue(dataChanged);
    }
  }, [form, settingsState]);

  return (
    <Form form={form} className="EarnPoints" onFinish={handleSubmit}>
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
          <Card title="Thông số" description="Thiết lập các giá trị cộng điểm cho học viên theo các trường hợp.">
            <Row gutter={[16, 16]}>
              {settingsState?.actions?.map((item) => {
                const currentPointAction = dataPointActionOptions.find((option) => option.value === item.id);
                const suffixText = item.id === EPointActionType.BUY_PRODUCT ? '%' : 'điểm';
                return (
                  <Col span={24}>
                    <Form.Item name={item.id} rules={[validationRules.required()]}>
                      <Input
                        label={currentPointAction?.label}
                        required
                        active
                        numberic
                        useNumber
                        suffixText={suffixText}
                      />
                    </Form.Item>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default EarnPoints;
