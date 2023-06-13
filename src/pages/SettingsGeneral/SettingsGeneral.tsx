import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Card from '@/components/Card';
import Input from '@/components/Input';
import { getMyAcademyAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { EEmpty } from '@/common/enums';
import { copyText, getFullUrlStatics } from '@/utils/functions';
import { dataAcademySizeOptions } from '@/common/constants';
import { TAcademy } from '@/common/models';
import Tooltip from '@/components/Tooltip';
import ModalAcademyForm from '@/pages/SettingsGeneral/ModalAcademyForm';

import './SettingsGeneral.scss';

const SettingsGeneral: React.FC = () => {
  const dispatch = useDispatch();

  const myAcademyState = useSelector((state: TRootState) => state.academyReducer.getMyAcademyResponse)?.data;
  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data;
  const cityOptions = settingsState?.cities?.map((item) => ({ label: item.name, value: item.id }));

  const [modalAcademyFormState, setModalAcademyFormState] = useState<{ visible: boolean; data?: TAcademy }>({
    visible: false,
  });

  const handleOpenModalAcademyForm = (data?: TAcademy): void => {
    setModalAcademyFormState({ visible: true, data });
  };

  const handleCloseModalAcademyForm = (): void => {
    setModalAcademyFormState({ visible: false });
  };

  const academyInfo = {
    logo: myAcademyState?.logo ? (
      <div className="SettingsGeneral-logo">
        <img src={getFullUrlStatics(myAcademyState?.logo)} alt="" />
      </div>
    ) : (
      EEmpty.DASH
    ),
    name: myAcademyState?.name || EEmpty.DASH,
    address: myAcademyState?.address || EEmpty.DASH,
    city: cityOptions?.find((item) => item.value === myAcademyState?.city?.id)?.label || EEmpty.DASH,
    size: dataAcademySizeOptions.find((item) => item.value === myAcademyState?.size)?.label || EEmpty.DASH,
    phoneNumber: myAcademyState?.primary_contact || EEmpty.DASH,
    director: myAcademyState?.director || EEmpty.DASH,
    accountName: myAcademyState?.account_name || EEmpty.DASH,
    accountNumber: myAcademyState?.account_number || EEmpty.DASH,
    bankName: myAcademyState?.bank_name || EEmpty.DASH,
    qrCode: myAcademyState?.qr_code ? (
      <div className="SettingsGeneral-qr-code">
        <img src={getFullUrlStatics(myAcademyState?.qr_code)} alt="" />
      </div>
    ) : (
      EEmpty.DASH
    ),
  };

  const getMyAcademy = useCallback(() => {
    dispatch(getMyAcademyAction.request({}));
  }, [dispatch]);

  useEffect(() => {
    getMyAcademy();
  }, [getMyAcademy]);

  return (
    <div className="SettingsGeneral">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col />
            <Col>
              <Row gutter={[16, 16]}>
                <Col>
                  <Button
                    title="Sửa"
                    styleType={EButtonStyleType.PURPLE}
                    iconName={EIconName.Pencil}
                    iconColor={EIconColor.WHITE}
                    onClick={(): void => handleOpenModalAcademyForm(myAcademyState)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Card title="Thông tin trung tâm">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Input label="Logo" readOnlyText active renderShowValue={academyInfo?.logo} />
              </Col>
              <Col span={12} />
              <Col span={12}>
                <Input label="Tên trung tâm" readOnlyText active value={academyInfo?.name} />
              </Col>
              <Col span={12}>
                <Input label="Người điều hành" readOnlyText active value={academyInfo?.director} />
              </Col>
              <Col span={24}>
                <Input label="Số lượng" readOnlyText active value={academyInfo?.size} />
              </Col>
              <Col span={22}>
                <Input label="Địa chỉ" readOnlyText active value={academyInfo?.address} />
              </Col>
              <Col span={12}>
                <Input label="Thành phố" readOnlyText active value={academyInfo?.city} />
              </Col>
              <Col span={12}>
                <Input label="Số điện thoại" readOnlyText active value={academyInfo?.phoneNumber} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Card title="Thông tin ngân hàng">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Input label="QR code" readOnlyText active renderShowValue={academyInfo?.qrCode} />
              </Col>
              <Col span={24}>
                <Input label="Tên tài khoản" readOnlyText active renderShowValue={academyInfo?.accountName} />
              </Col>
              <Col span={12}>
                <Input
                  label="Số tài khoản"
                  readOnlyText
                  active
                  value={academyInfo?.accountNumber}
                  suffixIcon={
                    <Tooltip title="Sao chép thành công" trigger={['click']} placement="right">
                      <Icon
                        className="cursor-pointer"
                        name={EIconName.Copy}
                        color={EIconColor.DOVE_GRAY}
                        onClick={(): void => {
                          copyText(academyInfo?.accountNumber);
                        }}
                      />
                    </Tooltip>
                  }
                />
              </Col>
              <Col span={12}>
                <Input label="Ngân hàng" readOnlyText active renderShowValue={academyInfo?.bankName} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <ModalAcademyForm {...modalAcademyFormState} onClose={handleCloseModalAcademyForm} onSuccess={getMyAcademy} />
    </div>
  );
};

export default SettingsGeneral;
