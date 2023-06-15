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
import { getManagerAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { EEmpty, EFormat } from '@/common/enums';
import { formatCurrency, formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import { dataAuditingStatusOptions, dataDegreeTypeOptions, dataSalaryTypeOptions } from '@/common/constants';
import Tags from '@/components/Tags';
import { TUser } from '@/common/models';
import ModalDeleteManager from '@/pages/Managers/ModalDeleteManager';
import ModalManagerForm from '@/pages/Managers/ModalManagerForm';
import Status from '@/components/Status';
import AttendancesTable from '@/pages/ManagerDetail/AttendancesTable';

import './ManagerDetail.scss';

const ManagerDetail: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const managerState = useSelector((state: TRootState) => state.managerReducer.getManagerResponse)?.data;
  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data;
  const cityOptions = settingsState?.cities?.map((item) => ({ label: item.name, value: item.id }));

  const [modalManagerFormState, setModalManagerFormState] = useState<{ visible: boolean; data?: TUser }>({
    visible: false,
  });
  const [modalDeleteManagerState, setModalDeleteManagerState] = useState<{ visible: boolean; data?: TUser }>({
    visible: false,
  });

  const handleOpenModalManagerForm = (data?: TUser): void => {
    setModalManagerFormState({ visible: true, data });
  };

  const handleCloseModalManagerForm = (): void => {
    setModalManagerFormState({ visible: false });
  };

  const handleOpenModalDeleteManager = (data?: TUser): void => {
    setModalDeleteManagerState({ visible: true, data });
  };

  const handleCloseModalDeleteManager = (): void => {
    setModalDeleteManagerState({ visible: false });
  };

  const handleBack = (): void => {
    navigate(Paths.Managers);
  };

  const managerInfo = {
    avatar: managerState?.avatar ? getFullUrlStatics(managerState.avatar) : undefined,
    name: managerState?.name || EEmpty.DASH,
    status: ((): React.ReactNode => {
      const status = dataAuditingStatusOptions.find((item) => item.value === managerState?.auditing_status);
      return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : EEmpty.DASH;
    })(),
    birthday: managerState?.date_of_birth
      ? formatISODateToDateTime(managerState?.date_of_birth, EFormat['DD/MM/YYYY'])
      : EEmpty.DASH,
    address: managerState?.address || EEmpty.DASH,
    city: cityOptions?.find((item) => item.value === managerState?.city?.id)?.label || EEmpty.DASH,
    phoneNumber: managerState?.mobile || EEmpty.DASH,
    dgreeType: dataDegreeTypeOptions.find((item) => item.value === managerState?.degree_type),
    branches: undefined || '-',
    classes:
      managerState?.classes && managerState?.classes?.length > 0 ? (
        <Tags
          options={managerState?.classes?.map((item) => ({
            label: item.name,
            value: String(item.id),
            data: { iconName: EIconName.ChalkBoard },
            onClick: (): void => {
              navigate(Paths.ClassDetail(String(item.id)));
            },
          }))}
        />
      ) : (
        EEmpty.DASH
      ),
    salaryType: dataSalaryTypeOptions.find((item) => item.value === managerState?.salary_type)?.label || EEmpty.DASH,
    salary: managerState?.salary ? formatCurrency({ amount: managerState.salary, showSuffix: true }) : EEmpty.DASH,
    totalIncome: managerState?.total_income
      ? formatCurrency({ amount: managerState.total_income, showSuffix: true })
      : EEmpty.DASH,
    note: managerState?.note || EEmpty.DASH,
  };

  const getManager = useCallback(() => {
    if (id) dispatch(getManagerAction.request({ paths: { id } }));
  }, [dispatch, id]);

  useEffect(() => {
    getManager();
  }, [getManager]);

  return (
    <div className="ManagerDetail">
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
                    title="Sửa"
                    styleType={EButtonStyleType.PURPLE}
                    iconName={EIconName.Pencil}
                    iconColor={EIconColor.WHITE}
                    onClick={(): void => handleOpenModalManagerForm(managerState)}
                  />
                </Col>
                <Col>
                  <Button
                    title="Xoá"
                    styleType={EButtonStyleType.DANGER_TRANSPARENT}
                    iconName={EIconName.Trash}
                    iconColor={EIconColor.POMEGRANATE}
                    onClick={(): void => handleOpenModalDeleteManager(managerState)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24} md={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 9 }}>
          <Card title="Thông tin cá nhân">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <UploadImage label="Ảnh đại diện" readOnlyText active value={managerInfo?.avatar} shape="circle" />
              </Col>
              <Col span={12}>
                <Input label="Trạng thái" readOnlyText active renderShowValue={managerInfo?.status} />
              </Col>
              <Col span={12}>
                <Input label="Họ và tên" readOnlyText active value={managerInfo?.name} />
              </Col>
              <Col span={12}>
                <Input label="Ngày sinh" readOnlyText active value={managerInfo?.birthday} />
              </Col>
              <Col span={12}>
                <Input label="Địa chỉ" readOnlyText active value={managerInfo?.address} />
              </Col>
              <Col span={12}>
                <Input label="Thành phố" readOnlyText active value={managerInfo?.city} />
              </Col>
              <Col span={12}>
                <Input label="Số điện thoại" readOnlyText active value={managerInfo?.phoneNumber} />
              </Col>
              <Col span={24}>
                <Input label="Ghi chú" readOnlyText active value={managerInfo?.note} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24} md={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 9 }}>
          <Card title="Thông tin công việc">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Input
                  label="Trình độ"
                  readOnlyText
                  active
                  value={managerInfo?.dgreeType?.label || EEmpty.DASH}
                  styleForm={{ color: managerInfo?.dgreeType?.data?.color }}
                />
              </Col>
              <Col span={24}>
                <Input label="Lớp học" readOnlyText active renderShowValue={managerInfo?.classes} />
              </Col>
              <Col span={12}>
                <Input label="Chế độ lương" readOnlyText active value={managerInfo?.salaryType} />
              </Col>
              <Col span={12}>
                <Input label="Lương" readOnlyText active value={managerInfo?.salary} />
              </Col>
              <Col span={24}>
                <Input label="Tổng thu nhập" readOnlyText active value={managerInfo?.totalIncome} />
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

      <ModalManagerForm {...modalManagerFormState} onClose={handleCloseModalManagerForm} onSuccess={getManager} />
      <ModalDeleteManager {...modalDeleteManagerState} onClose={handleCloseModalDeleteManager} onSuccess={handleBack} />
    </div>
  );
};

export default ManagerDetail;
