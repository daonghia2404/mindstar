import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Card from '@/components/Card';
import { showNotification, validationRules } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import { EUpdateSettingsAction, getSettingsAction, updateSettingsAction } from '@/redux/actions';
import { ETypeNotification } from '@/common/enums';
import { Paths } from '@/pages/routers';
import Switch from '@/components/Switch';
import TextArea from '@/components/TextArea';

import './ScheduleMode.scss';

const ScheduleMode: React.FC = () => {
  const dispatch = useDispatch();

  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data
    ?.schedule_settings;
  const updateSettingsLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateSettingsAction.UPDATE_SETTINGS],
  );
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});

  const handleBack = (): void => {
    navigate(Paths.SettingsGeneral);
  };

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getSettings = (): void => {
    dispatch(getSettingsAction.request({ headers: { branchIds: currentBranchId } }));
  };

  const handleSubmit = (values: any): void => {
    const body = {
      schedule_settings: {
        is_enable: values?.enableSchedule,
        message: values?.messageShow,
      },
    };

    dispatch(updateSettingsAction.request({ body }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    getSettings();
    showNotification(ETypeNotification.SUCCESS, 'Cập Nhật Cấu Hình Thành Công !');
  };

  useEffect(() => {
    if (settingsState) {
      const dataChanged = {
        enableSchedule: settingsState?.is_enable,
        messageShow: settingsState?.message || '',
      };
      form.setFieldsValue(dataChanged);
      setFormValues({ ...formValues, ...dataChanged });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, settingsState]);

  return (
    <Form
      form={form}
      className="ScheduleMode"
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
          <Card title="Thông số" description="Thiết lập chế độ nghỉ của trung tâm và tin nhắn thông báo cho học viên.">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item name="enableSchedule">
                  <Switch label="Bật chế độ học" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="messageShow"
                  rules={!formValues?.enableSchedule ? [validationRules.required()] : undefined}
                >
                  <TextArea
                    label="Tin nhắn hiển thị"
                    active
                    required={!formValues?.enableSchedule}
                    disabled={formValues?.enableSchedule}
                    placeholder="Nhập dữ liệu"
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

export default ScheduleMode;
