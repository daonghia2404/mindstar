import React, { useCallback, useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Card from '@/components/Card';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import { EUpdateSettingsAction, getBranchesAction, getSettingsAction, updateSettingsAction } from '@/redux/actions';
import { EAuditingStatus, ETransportFeeType, ETypeNotification } from '@/common/enums';
import { Paths } from '@/pages/routers';
import Switch from '@/components/Switch';

import './TransportMode.scss';
import { DEFAULT_PAGE, dataTransportFeeTypeOptions } from '@/common/constants';
import Radio from '@/components/Radio';
import Input from '@/components/Input';

const TransportMode: React.FC = () => {
  const dispatch = useDispatch();

  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data
    ?.transport_settings;
  const updateSettingsLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateSettingsAction.UPDATE_SETTINGS],
  );
  const branchesState = useSelector((state: TRootState) => state.branchReducer.getBranchesResponse)?.data;

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
      transport_settings: branchesState?.content?.map((item) => ({
        branch_id: item.id,
        is_enable: values[`branch_${item.id}`] || false,
        fee_type: values[`feeType_${item.id}`] ? Number(values[`feeType_${item.id}`]?.value) : undefined,
        amount: values[`amount_${item.id}`],
      })),
    };

    dispatch(updateSettingsAction.request({ body }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    getSettings();
    showNotification(ETypeNotification.SUCCESS, 'Cập Nhật Cấu Hình Thành Công !');
  };

  const getBranches = useCallback(() => {
    dispatch(
      getBranchesAction.request(
        { params: { page: DEFAULT_PAGE, size: 1, auditingStatuses: `${EAuditingStatus.ACTIVE}` } },
        (response): void => {
          dispatch(
            getBranchesAction.request({
              params: {
                page: DEFAULT_PAGE,
                size: response?.data?.total_elements,
                auditingStatuses: `${EAuditingStatus.ACTIVE}`,
              },
            }),
          );
        },
      ),
    );
  }, [dispatch]);

  useEffect(() => {
    if (settingsState) {
      const dataChanged = settingsState?.reduce((result, item) => {
        return {
          ...result,
          [`branch_${item.branch_id}`]: item.is_enable,
          [`feeType_${item.branch_id}`]: dataTransportFeeTypeOptions.find((option) => option.value === item.fee_type),
          [`amount_${item.branch_id}`]: item.amount,
        };
      }, {});
      form.setFieldsValue(dataChanged);
      setFormValues({ ...formValues, ...dataChanged });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, settingsState]);

  useEffect(() => {
    getBranches();
  }, [getBranches]);

  return (
    <Form
      form={form}
      className="TransportMode"
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
          <Card
            title="Thông số"
            description="Thiết lập chế độ dịch vụ điểm đón tại các chi nhánh (mặc định sẽ là OFF)."
          >
            <Row gutter={[16, 16]}>
              {branchesState?.total_elements === branchesState?.content?.length &&
                branchesState?.content?.map((item) => (
                  <Col key={item.id} span={24}>
                    <div className="TransportMode-item">
                      <Form.Item name={`branch_${item.id}`}>
                        <Switch
                          label={item.name}
                          onChange={(checked): void => {
                            const dataChanged = {
                              [`branch_${item.id}`]: checked,
                              [`feeType_${item.id}`]: dataTransportFeeTypeOptions.find(
                                (option) => option.value === ETransportFeeType.FREE,
                              ),
                            };
                            setFormValues({ ...formValues, ...dataChanged });
                            form.setFieldsValue(dataChanged);
                          }}
                        />
                      </Form.Item>
                      {formValues?.[`branch_${item.id}`] && (
                        <div className="TransportMode-item-info">
                          <Form.Item name={`feeType_${item.id}`}>
                            <Radio
                              options={dataTransportFeeTypeOptions.map((option) => {
                                if (option.value === ETransportFeeType.MONTH) {
                                  return {
                                    ...option,
                                    label: (
                                      <Row gutter={[16, 16]} align="middle">
                                        <Col>Trả Phí</Col>
                                        <Col>
                                          <Form.Item name={`amount_${item.id}`}>
                                            <Input
                                              label="Phí đưa đón"
                                              placeholder="Nhập dữ liệu"
                                              active
                                              numberic
                                              useNumber
                                              useComma
                                              suffixText="đ (theo tháng)"
                                            />
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                    ),
                                  };
                                }
                                return option;
                              })}
                            />
                          </Form.Item>
                        </div>
                      )}
                    </div>
                  </Col>
                ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default TransportMode;
