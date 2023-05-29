import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Row } from 'antd';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import {
  EChangePlayersBranchAction,
  changePlayersBranchAction,
  getBranchesAction,
  getChildPlayersAction,
  getClassesAction,
} from '@/redux/actions';
import { schedulesOptionsByClassSchedule, showNotification, validationRules } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import Select, { TSelectOption } from '@/components/Select';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { useOptionsPaginate } from '@/utils/hooks';
import CheckboxGroup from '@/components/CheckboxGroup';

import { TModalChangeBranchProps } from './ModalChangeBranch.type';
import './ModalChangeBranch.scss';

const ModalChangeBranch: React.FC<TModalChangeBranchProps> = ({ visible, data, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<any>({});
  const changePlayersBranchLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EChangePlayersBranchAction.CHANGE_PLAYERS_BRANCH],
  );

  const childPlayersState = useSelector((state: TRootState) => state.userReducer.getChildPlayersResponse)?.data
    ?.players;

  const {
    options: optionsBranches,
    handleLoadMore: handleLoadMoreBranches,
    handleSearch: handleSearchBranches,
  } = useOptionsPaginate(getBranchesAction, 'branchReducer', 'getBranchesResponse', 'branchName');

  const {
    options: optionsClasses,
    handleLoadMore: handleLoadMoreClasses,
    handleSearch: handleSearchClasses,
    handleReset: handleResetClasses,
  } = useOptionsPaginate(
    getClassesAction,
    'classReducer',
    'getClassesResponse',
    undefined,
    {},
    { branchIds: formValues?.targetBranch?.value || '' },
  );

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = childPlayersState?.map((player) => {
        const classChange = values?.[`class_${player.id}`];
        const scheduleChange = values?.[`schedule_${player.id}`];

        return {
          player_id: player.id,
          class_id: Number(classChange?.value),
          player_schedules: scheduleChange?.map((item: TSelectOption) => ({
            day_of_week: item.value,
            at_time: item?.data?.at_time,
            duration_in_second: item?.data?.duration_in_second,
          })),
        };
      });

      dispatch(changePlayersBranchAction.request({ body }, handleSubmitSuccess));
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Thay Đổi Chi Nhánh Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  const getChildPlayers = useCallback(() => {
    if (data) dispatch(getChildPlayersAction.request({ paths: { id: data?.id } }));
  }, [dispatch, data]);

  useEffect(() => {
    if (visible) {
      if (data) {
        const dataChanged = {
          currentBranch: data?.branch ? { label: data?.branch?.name, value: String(data?.branch?.id) } : undefined,
        };
        form.setFieldsValue(dataChanged);
        setFormValues({ ...formValues, ...dataChanged });
      }
    } else {
      form.resetFields();
      setFormValues({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, data, visible]);

  useEffect(() => {
    if (formValues?.targetBranch?.value) handleResetClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues?.targetBranch?.value]);

  useEffect(() => {
    getChildPlayers();
  }, [getChildPlayers]);

  return (
    <Modal
      className="ModalChangeBranch"
      title="Đổi Chi Nhánh"
      visible={visible}
      onClose={onClose}
      width={600}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.PURPLE_TRANSPARENT,
        disabled: changePlayersBranchLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.PURPLE,
        disabled: changePlayersBranchLoading,
      }}
    >
      <Form
        form={form}
        className="ModalChangeBranch-wrapper"
        onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Row gutter={[16, 16]}>
              <Col flex={1}>
                <Form.Item name="currentBranch">
                  <Select
                    label="Chi nhánh hiện tại"
                    showSearch
                    readonly
                    options={optionsBranches}
                    onLoadMore={handleLoadMoreBranches}
                    onSearch={handleSearchBranches}
                  />
                </Form.Item>
              </Col>
              <Col style={{ marginTop: '1.2rem' }}>
                <Icon name={EIconName.ArrowLongRight} color={EIconColor.DOVE_GRAY} />
              </Col>
              <Col flex={1}>
                <Form.Item name="targetBranch" rules={[validationRules.required()]}>
                  <Select
                    label="Chi nhánh thay đổi"
                    showSearch
                    required
                    options={optionsBranches?.filter((item) => item.value !== String(data?.branch?.id))}
                    onLoadMore={handleLoadMoreBranches}
                    onSearch={handleSearchBranches}
                    onChange={(option): void => {
                      const dataChanged = {
                        ...childPlayersState?.reduce((result, item) => {
                          return {
                            ...result,
                            [`class_${item.id}`]: undefined,
                            [`schedule_${item.id}`]: undefined,
                          };
                        }, {}),
                        targetBranch: option,
                      };
                      form.setFieldsValue(dataChanged);
                      setFormValues({ ...formValues, ...dataChanged });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          {formValues?.targetBranch &&
            childPlayersState?.map((item) => (
              <Col span={24}>
                <Row gutter={[16, 16]} wrap={false}>
                  <Col span={8}>
                    <div style={{ marginTop: '1rem' }}>{item.name || EEmpty.DASH}</div>
                  </Col>
                  <Col flex={1}>
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <Form.Item name={`class_${item.id}`} rules={[validationRules.required()]}>
                          <Select
                            label="Lớp học thay đổi"
                            showSearch
                            required
                            options={optionsClasses}
                            onLoadMore={handleLoadMoreClasses}
                            onSearch={handleSearchClasses}
                            onChange={(option): void => {
                              const dataChanged = {
                                [`class_${item.id}`]: option,
                                [`schedule_${item.id}`]: undefined,
                              };
                              form.setFieldsValue(dataChanged);
                              setFormValues({ ...formValues, ...dataChanged });
                            }}
                          />
                        </Form.Item>
                      </Col>
                      {formValues?.[`class_${item.id}`] && (
                        <Col span={24}>
                          <Form.Item name={`schedule_${item.id}`} rules={[validationRules.required()]}>
                            <CheckboxGroup
                              label="Lịch học"
                              required
                              options={schedulesOptionsByClassSchedule(
                                formValues?.[`class_${item.id}`]?.data?.schedules,
                              )}
                            />
                          </Form.Item>
                        </Col>
                      )}
                    </Row>
                  </Col>
                </Row>
              </Col>
            ))}
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalChangeBranch;
