import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { navigate, useParams } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';

import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Card from '@/components/Card';
import Input from '@/components/Input';
import UploadImage from '@/components/UploadImage';
import { Paths } from '@/pages/routers';
import { getPlayerAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { EEmpty, EFormat } from '@/common/enums';
import { formatCurrency, formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import { dataAuditingStatusOptions, dataDayOfWeeksOptions } from '@/common/constants';
import Tags from '@/components/Tags';
import { TUser } from '@/common/models';
import ModalDeletePlayer from '@/pages/Players/ModalDeletePlayer';
import ModalPlayerForm from '@/pages/Players/ModalPlayerForm';
import Status from '@/components/Status';
import ModalResetPassword from '@/pages/PlayerDetail/ModalResetPassword';
import ModalChangeBranch from '@/pages/PlayerDetail/ModalChangeBranch';
import AttendancesTable from '@/pages/PlayerDetail/AttendancesTable';

import './PlayerDetail.scss';

const PlayerDetail: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const playerState = useSelector((state: TRootState) => state.playerReducer.getPlayerResponse)?.data;
  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data;
  const cityOptions = settingsState?.cities?.map((item) => ({ label: item.name, value: item.id }));

  const [modalPlayerFormState, setModalPlayerFormState] = useState<{ visible: boolean; data?: TUser }>({
    visible: false,
  });
  const [modalDeletePlayerState, setModalDeletePlayerState] = useState<{ visible: boolean; data?: TUser }>({
    visible: false,
  });
  const [modalResetPasswordState, setModalResetPasswordState] = useState<{ visible: boolean; data?: TUser }>({
    visible: false,
  });
  const [modalChangeBranchState, setModalChangeBranchState] = useState<{ visible: boolean; data?: TUser }>({
    visible: false,
  });

  const handleOpenModalPlayerForm = (data?: TUser): void => {
    setModalPlayerFormState({ visible: true, data });
  };

  const handleCloseModalPlayerForm = (): void => {
    setModalPlayerFormState({ visible: false });
  };

  const handleOpenModalDeletePlayer = (data?: TUser): void => {
    setModalDeletePlayerState({ visible: true, data });
  };

  const handleCloseModalDeletePlayer = (): void => {
    setModalDeletePlayerState({ visible: false });
  };

  const handleOpenModalResetPassword = (data?: TUser): void => {
    setModalResetPasswordState({ visible: true, data });
  };

  const handleCloseModalResetPassword = (): void => {
    setModalResetPasswordState({ visible: false });
  };

  const handleOpenModalChangeBranch = (data?: TUser): void => {
    setModalChangeBranchState({ visible: true, data });
  };

  const handleCloseModalChangeBranch = (): void => {
    setModalChangeBranchState({ visible: false });
  };

  const handleBack = (): void => {
    navigate(Paths.Players);
  };

  const playerInfo = {
    avatar: playerState?.avatar ? getFullUrlStatics(playerState.avatar) : undefined,
    name: playerState?.name || EEmpty.DASH,
    branch: (
      <Row justify="space-between" align="middle">
        <Col>
          {playerState?.branch ? (
            <Tags
              options={[
                {
                  value: String(playerState?.branch?.id),
                  label: playerState?.branch?.name || EEmpty.DASH,
                  data: {
                    iconName: EIconName.MapMarker,
                  },
                },
              ]}
            />
          ) : (
            EEmpty.DASH
          )}
        </Col>
      </Row>
    ),
    status: ((): React.ReactNode => {
      const status = dataAuditingStatusOptions.find((item) => item.value === playerState?.auditing_status);
      return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : EEmpty.DASH;
    })(),
    birthday: playerState?.date_of_birth
      ? formatISODateToDateTime(playerState?.date_of_birth, EFormat['DD/MM/YYYY'])
      : EEmpty.DASH,
    address: playerState?.address || EEmpty.DASH,
    city: cityOptions?.find((item) => item.value === playerState?.city?.id)?.label || EEmpty.DASH,
    parentName: playerState?.parent_name || EEmpty.DASH,
    phoneNumber: playerState?.mobile || EEmpty.DASH,
    note: playerState?.note || EEmpty.DASH,
    position: playerState?.position || EEmpty.DASH,
    shirtNumber: typeof playerState?.clothes_number === 'number' ? String(playerState?.clothes_number) : EEmpty.DASH,
    createDate: playerState?.create_date
      ? formatISODateToDateTime(playerState?.create_date, EFormat['DD/MM/YYYY'])
      : EEmpty.DASH,
    username: playerState?.user?.user_name || EEmpty.DASH,
    class: playerState?.class ? (
      <Tags
        options={[
          {
            value: String(playerState?.class?.id),
            label: playerState?.class?.name,
            data: {
              iconName: EIconName.ChalkBoard,
            },
            onClick: (): void => {
              navigate(Paths.ClassDetail(String(playerState?.class?.id)));
            },
          },
        ]}
      />
    ) : (
      EEmpty.DASH
    ),
    schedules: ((): React.ReactNode => {
      const schedulesOptions = playerState?.player_schedules
        ?.map((item) => {
          const parseDayOfWeek = item.day_of_week.split(',')?.filter((subItem) => subItem);

          return parseDayOfWeek.map((subItem) => ({
            ...item,
            day_of_week: subItem,
          }));
        })
        .flat()
        .map((item, index) => {
          const startTime = formatISODateToDateTime(item.at_time, EFormat['HH:mm']);
          const endTime = formatISODateToDateTime(item.at_time + item.duration_in_second * 1000, EFormat['HH:mm']);
          const dayLabel = dataDayOfWeeksOptions.find((subItem) => subItem.value === item.day_of_week)?.label;

          return {
            label: `${dayLabel} | ${startTime} - ${endTime}`,
            value: index,
            data: {
              iconName: EIconName.Calendar,
            },
          };
        });

      return playerState?.player_schedules && playerState?.player_schedules?.length ? (
        <Tags options={schedulesOptions} />
      ) : (
        EEmpty.DASH
      );
    })(),
    membershipFee:
      typeof playerState?.transaction_amount === 'number'
        ? formatCurrency({ amount: playerState?.transaction_amount, showSuffix: true })
        : EEmpty.DASH,
    numberOfUnits: typeof playerState?.number_of_units === 'number' ? playerState?.number_of_units : EEmpty.DASH,
    referralCode: playerState?.referral_code_used || EEmpty.DASH,
  };

  const getPlayer = useCallback(() => {
    if (id) dispatch(getPlayerAction.request({ paths: { id } }));
  }, [dispatch, id]);

  useEffect(() => {
    getPlayer();
  }, [getPlayer]);

  return (
    <div className="PlayerDetail">
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
                    title="Đặt lại mật khẩu"
                    iconName={EIconName.Lock}
                    iconColor={EIconColor.PURPLE_HEART}
                    styleType={EButtonStyleType.PURPLE_TRANSPARENT}
                    onClick={(): void => handleOpenModalResetPassword(playerState?.user)}
                  />
                </Col>
                <Col>
                  <Button
                    title="Đổi chi nhánh"
                    iconName={EIconName.ArrowExchange}
                    iconColor={EIconColor.PURPLE_HEART}
                    styleType={EButtonStyleType.PURPLE_TRANSPARENT}
                    onClick={(): void => handleOpenModalChangeBranch(playerState)}
                  />
                </Col>
                <Col>
                  <Button
                    title="Sửa"
                    styleType={EButtonStyleType.PURPLE}
                    iconName={EIconName.Pencil}
                    iconColor={EIconColor.WHITE}
                    onClick={(): void => handleOpenModalPlayerForm(playerState)}
                  />
                </Col>
                <Col>
                  <Button
                    title="Xoá"
                    styleType={EButtonStyleType.DANGER_TRANSPARENT}
                    iconName={EIconName.Trash}
                    iconColor={EIconColor.POMEGRANATE}
                    onClick={(): void => handleOpenModalDeletePlayer(playerState)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24} md={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 9 }}>
          <Card title="Thông tin học viên">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <UploadImage label="Ảnh đại diện" readOnlyText active value={playerInfo?.avatar} />
              </Col>
              <Col span={12}>
                <Input label="Trạng thái" readOnlyText active renderShowValue={playerInfo?.status} />
              </Col>
              <Col span={12}>
                <Input label="Họ và tên" readOnlyText active value={playerInfo?.name} />
              </Col>
              <Col span={12}>
                <Input label="Ngày sinh" readOnlyText active value={playerInfo?.birthday} />
              </Col>
              <Col span={12}>
                <Input label="Địa chỉ" readOnlyText active value={playerInfo?.address} />
              </Col>
              <Col span={12}>
                <Input label="Thành phố" readOnlyText active value={playerInfo?.city} />
              </Col>
              <Col span={12}>
                <Input label="Tên bố/mẹ" readOnlyText active value={playerInfo?.parentName} />
              </Col>
              <Col span={12}>
                <Input label="Số điện thoại" readOnlyText active value={playerInfo?.phoneNumber} />
              </Col>
              <Col span={12}>
                <Input label="Tên đăng nhập" readOnlyText active value={playerInfo?.username} />
              </Col>
              <Col span={12}>
                <Input label="Ngày tham gia" readOnlyText active value={playerInfo?.createDate} />
              </Col>
              <Col span={12}>
                <Input label="Mã giới thiệu" readOnlyText active renderShowValue={playerInfo?.referralCode} />
              </Col>
              <Col span={24}>
                <Input label="Ghi chú" readOnlyText active value={playerInfo?.note} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24} md={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 9 }}>
          <Card title="Thông tin khoá học">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Input label="Vai trò" readOnlyText active value={playerInfo?.position} />
              </Col>
              <Col span={12}>
                <Input label="Số áo" readOnlyText active value={playerInfo?.shirtNumber} />
              </Col>
              <Col span={12}>
                <Input label="Chi nhánh" readOnlyText active renderShowValue={playerInfo?.branch} />
              </Col>
              <Col span={12}>
                <Input label="Lớp học" readOnlyText active renderShowValue={playerInfo?.class} />
              </Col>
              <Col span={24}>
                <Input label="Lịch học" readOnlyText active renderShowValue={playerInfo?.schedules} />
              </Col>
              <Col span={12}>
                <Input label="Số buổi còn lại" readOnlyText active renderShowValue={playerInfo?.numberOfUnits} />
              </Col>
              <Col span={12}>
                <Input label="Học phí" readOnlyText active renderShowValue={playerInfo?.membershipFee} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24} md={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 6 }}>
          <Card title="Thông tin điểm danh">
            <AttendancesTable />
          </Card>
        </Col>
      </Row>

      <ModalPlayerForm {...modalPlayerFormState} onClose={handleCloseModalPlayerForm} onSuccess={getPlayer} />
      <ModalDeletePlayer {...modalDeletePlayerState} onClose={handleCloseModalDeletePlayer} onSuccess={handleBack} />
      <ModalResetPassword {...modalResetPasswordState} onClose={handleCloseModalResetPassword} />
      <ModalChangeBranch {...modalChangeBranchState} onClose={handleCloseModalChangeBranch} onSuccess={getPlayer} />
    </div>
  );
};

export default PlayerDetail;
