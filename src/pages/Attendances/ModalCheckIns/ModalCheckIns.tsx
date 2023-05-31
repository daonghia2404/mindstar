import React, { useCallback, useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EUpdateAttendancesAction, getAttendancePlayersAction, updateAttendancesAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import Empty from '@/components/Empty';
import Avatar from '@/components/Avatar';
import { formatISODateToDateTime, getArrayFrom0To, getFullUrlStatics, showNotification } from '@/utils/functions';
import { EEmpty, EFormat, ETypeCheckIn, ETypeNotification } from '@/common/enums';
import Select from '@/components/Select';
import AttendanceCheckbox from '@/components/AttendanceCheckbox';
import Input from '@/components/Input';

import { TModalCheckInsProps } from './ModalCheckIns.type';
import './ModalCheckIns.scss';

const ModalCheckIns: React.FC<TModalCheckInsProps> = ({ visible, getAttendancesParamsRequest, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const updateAttendancesLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateAttendancesAction.UPDATE_ATTENDANCES],
  );

  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data
    ?.attendance_settings?.max_unit_per_lesson;

  const unitLessonOptions = getArrayFrom0To(settingsState || 0)?.map((item) => ({
    label: String(item + 1),
    value: String(item + 1),
  }));

  const attendancePlayersState = useSelector(
    (state: TRootState) => state.attendanceReducer.getAttendancePlayersResponse,
  )?.data?.content;

  const isEmpty = attendancePlayersState?.length === 0;

  const handleSubmit = (): void => {
    const body = {
      branch_id: currentBranchId,
      class_id: Number((getAttendancesParamsRequest?.classId as any)?.value),
      at_date: getAttendancesParamsRequest?.fromDate,
      duration_in_second: 32400,
      player_check_in: attendancePlayersState?.map((item) => {
        const {
          [`${item.player_id}_checked_in`]: checked_in,
          [`${item.player_id}_description`]: description,
          [`${item.player_id}_unit_value`]: unit_value,
        } = formValues;

        return {
          checked_in: typeof checked_in === 'number' ? checked_in : ETypeCheckIn.NONE,
          description: description || '',
          unit_value: unit_value ? Number(unit_value?.value) : 0,
          player_id: item.player_id,
        };
      }),
    };

    dispatch(updateAttendancesAction.request({ body }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Điểm danh thành công !');
    onClose?.();
    onSuccess?.();
  };

  const getAttendancePlayers = useCallback(() => {
    if (
      visible &&
      getAttendancesParamsRequest?.classId &&
      getAttendancesParamsRequest?.fromDate &&
      getAttendancesParamsRequest?.toDate
    ) {
      dispatch(
        getAttendancePlayersAction.request({
          params: {
            fromDate: getAttendancesParamsRequest?.fromDate,
            toDate: getAttendancesParamsRequest?.toDate,
            classId: (getAttendancesParamsRequest?.classId as any)?.value,
          },
        }),
      );
    }
  }, [getAttendancesParamsRequest, visible, dispatch]);

  useEffect(() => {
    getAttendancePlayers();
  }, [getAttendancePlayers]);

  return (
    <>
      <Modal
        className="ModalCheckIns"
        title={`Điểm danh (${formatISODateToDateTime(
          getAttendancesParamsRequest?.fromDate || '',
          EFormat['DD/MM/YYYY'],
        )})`}
        visible={visible}
        onClose={onClose}
        width={700}
        cancelButton={{ title: 'Huỷ Bỏ', disabled: updateAttendancesLoading, onClick: onClose }}
        confirmButton={{ title: 'Đồng Ý', disabled: updateAttendancesLoading, onClick: handleSubmit }}
      >
        <div className="ModalCheckIns-wrapper">
          {isEmpty ? (
            <Empty />
          ) : (
            <Form form={form} onValuesChange={(value, values): void => setFormValues(values)}>
              <Row gutter={[16, 0]}>
                {attendancePlayersState?.map((item) => (
                  <Col span={24}>
                    <div className="ModalCheckIns-item">
                      <Row gutter={[16, 16]} wrap={false} align="middle">
                        <Col>
                          <Avatar size={48} image={getFullUrlStatics(item.player.avatar)} />
                        </Col>
                        <Col span={8}>
                          <div className="ModalCheckIns-info">
                            <div className="ModalCheckIns-info-title">{item.player.name}</div>
                            {item.player.mobile ? (
                              <a
                                href={`tel: ${item.player.mobile}`}
                                className="ModalCheckIns-link"
                                onClick={(e): void => e.stopPropagation()}
                              >
                                {item.player.mobile}
                              </a>
                            ) : (
                              <div className="ModalCheckIns-info-description">{EEmpty.DASH}</div>
                            )}
                          </div>
                        </Col>
                        <Col>
                          <Form.Item name={`${item.player_id}_unit_value`}>
                            <Select
                              label="Số buổi"
                              options={unitLessonOptions}
                              disabled={[ETypeCheckIn.NONE, ETypeCheckIn.ABSENT, undefined].includes(
                                formValues[`${item.player_id}_checked_in`],
                              )}
                              style={{ width: '12rem' }}
                            />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item name={`${item.player_id}_description`}>
                            <Input label="Ghi chú" />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item name={`${item.player_id}_checked_in`}>
                            <AttendanceCheckbox
                              onChange={(data): void => {
                                const isPresent = ![ETypeCheckIn.NONE, ETypeCheckIn.ABSENT, undefined].includes(data);
                                const dataChanged = {
                                  [`${item.player_id}_checked_in`]: data,
                                  [`${item.player_id}_unit_value`]: isPresent ? unitLessonOptions[0] : undefined,
                                };
                                form.setFieldsValue(dataChanged);
                                setFormValues({ ...formValues, ...dataChanged });
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                ))}
              </Row>
            </Form>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalCheckIns;