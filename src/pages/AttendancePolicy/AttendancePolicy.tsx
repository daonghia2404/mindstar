import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Card from '@/components/Card';
import Select from '@/components/Select';
import Input from '@/components/Input';
import { getArrayFrom0To, showNotification, validationRules } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import { EUpdateSettingsAction, updateSettingsAction } from '@/redux/actions';
import { ETypeNotification } from '@/common/enums';
import { Paths } from '@/pages/routers';
import Switch from '@/components/Switch';

import './AttendancePolicy.scss';

const AttendancePolicy: React.FC = () => {
  const dispatch = useDispatch();

  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data
    ?.attendance_settings;
  const updateSettingsLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateSettingsAction.UPDATE_SETTINGS],
  );
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});

  const maxUnitOptions = getArrayFrom0To(5)?.map((item) => ({
    label: String(item + 1),
    value: String(item + 1),
  }));

  const handleBack = (): void => {
    navigate(Paths.SettingsGeneral);
  };

  const handleSubmit = (values: any): void => {
    const body = {
      attendance_settings: {
        is_multi_attendee_enable: values?.allowMultiAttendee,
        is_own_setting_enable: values?.allowOwe,
        is_time_off_setting_enable: values?.allowTimeOff,
        max_own: values?.maxOwe,
        max_time_off: values?.maxTimeOff,
        max_unit_per_lesson: values?.maxUnit ? Number(values?.maxUnit?.value) : undefined,
      },
    };

    dispatch(updateSettingsAction.request({ body }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Cập nhật cấu hình thành công !');
  };

  useEffect(() => {
    if (settingsState) {
      const dataChanged = {
        allowOwe: settingsState?.is_own_setting_enable,
        allowTimeOff: settingsState?.is_time_off_setting_enable,
        allowMultiAttendee: settingsState?.is_multi_attendee_enable,
        maxOwe: settingsState?.max_own,
        maxTimeOff: settingsState?.max_time_off,
        maxUnit: maxUnitOptions.find((item) => Number(item.value) === settingsState?.max_unit_per_lesson),
      };
      form.setFieldsValue(dataChanged);
      setFormValues({ ...formValues, ...dataChanged });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, settingsState]);

  return (
    <Form
      form={form}
      className="AttendancePolicy"
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
          <Card title="Cấu hình">
            <Row gutter={[16, 16]}>
              <Col span={10}>
                <Form.Item name="allowOwe">
                  <Switch label="Cho phép điểm danh" />
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item name="maxOwe" rules={formValues?.allowOwe ? [validationRules.required()] : undefined}>
                  <Input
                    label="Số lần điểm danh tối đa"
                    active
                    numberic
                    useNumber
                    required={formValues?.allowOwe}
                    disabled={!formValues?.allowOwe}
                    placeholder="Nhập dữ liệu"
                    suffixText="buổi"
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item name="allowTimeOff">
                  <Switch label="Cho phép yêu cầu nghỉ" />
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item
                  name="maxTimeOff"
                  rules={formValues?.allowTimeOff ? [validationRules.required()] : undefined}
                >
                  <Input
                    label="Số yêu cầu nghỉ tối đa"
                    active
                    numberic
                    useNumber
                    required={formValues?.allowTimeOff}
                    disabled={!formValues?.allowTimeOff}
                    placeholder="Nhập dữ liệu"
                    suffixText="buổi"
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item name="allowMultiAttendee">
                  <Switch label="Cho phép điểm danh nhiều lần" />
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item name="maxUnit">
                  <Select label="Số buổi tối đa" active placeholder="Chọn dữ liệu" options={maxUnitOptions} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default AttendancePolicy;
