import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { navigate, useParams } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';

import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Card from '@/components/Card';
import Input from '@/components/Input';
import { Paths } from '@/pages/routers';
import { getClassAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { EEmpty } from '@/common/enums';
import { dataAuditingStatusOptions } from '@/common/constants';
import Tags from '@/components/Tags';
import { TClass } from '@/common/models';
import Status from '@/components/Status';
import ModalClassForm from '@/pages/Classes/ModalClassForm';
import ModalDeleteClass from '@/pages/Classes/ModalDeleteClass';
import { formatCurrency } from '@/utils/functions';
import ManagersTable from '@/pages/ClassDetail/ManagersTable';
import PlayersTable from '@/pages/ClassDetail/PlayersTable';

import './ClassDetail.scss';

const ClassDetail: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const classState = useSelector((state: TRootState) => state.classReducer.getClassResponse)?.data;

  const [modalClassFormState, setModalClassFormState] = useState<{ visible: boolean; data?: TClass }>({
    visible: false,
  });
  const [modalDeleteClassState, setModalDeleteClassState] = useState<{ visible: boolean; data?: TClass }>({
    visible: false,
  });

  const handleOpenModalClassForm = (data?: TClass): void => {
    setModalClassFormState({ visible: true, data });
  };

  const handleCloseModalClassForm = (): void => {
    setModalClassFormState({ visible: false });
  };

  const handleOpenModalDeleteClass = (data?: TClass): void => {
    setModalDeleteClassState({ visible: true, data });
  };

  const handleCloseModalDeleteClass = (): void => {
    setModalDeleteClassState({ visible: false });
  };

  const handleBack = (): void => {
    navigate(Paths.Classes);
  };

  const classInfo = {
    name: classState?.name || EEmpty.DASH,
    numberPlayers: String(classState?.number_of_players || EEmpty.ZERO),
    status: ((): React.ReactNode => {
      const status = dataAuditingStatusOptions.find((item) => item.value === classState?.auditing_status);
      return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : EEmpty.DASH;
    })(),
    courseFee: classState?.course_fee
      ? formatCurrency({ amount: classState?.course_fee, showSuffix: true })
      : EEmpty.DASH,
    description: classState?.description || EEmpty.DASH,
    branch: classState?.branch ? (
      <Tags
        options={[
          {
            label: classState?.branch?.name,
            value: String(classState?.branch?.id),
            data: { iconName: EIconName.MapMarker },
          },
        ]}
      />
    ) : (
      EEmpty.DASH
    ),
  };

  const getClass = useCallback(() => {
    if (id) dispatch(getClassAction.request({ paths: { id } }));
  }, [dispatch, id]);

  useEffect(() => {
    getClass();
  }, [getClass]);

  return (
    <div className="ClassDetail">
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
                    onClick={(): void => handleOpenModalClassForm(classState)}
                  />
                </Col>
                <Col>
                  <Button
                    title="Xoá"
                    styleType={EButtonStyleType.DANGER_TRANSPARENT}
                    iconName={EIconName.Trash}
                    iconColor={EIconColor.POMEGRANATE}
                    onClick={(): void => handleOpenModalDeleteClass(classState)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Card title="Thông tin lớp học">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Input label="Tên" readOnlyText active value={classInfo?.name} />
              </Col>
              <Col span={12}>
                <Input label="Chi nhánh" readOnlyText active renderShowValue={classInfo?.branch} />
              </Col>
              <Col span={12}>
                <Input label="Tổng học viên" readOnlyText active value={classInfo?.numberPlayers} />
              </Col>
              <Col span={12}>
                <Input label="Học phí" readOnlyText active value={classInfo?.courseFee} />
              </Col>
              <Col span={24}>
                <Input label="Trạng thái" readOnlyText active renderShowValue={classInfo?.status} />
              </Col>
              <Col span={24}>
                <Input label="Mô tả" readOnlyText active renderShowValue={classInfo?.description} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Card title="Thông tin giáo viên">
            <ManagersTable dataSources={classState?.managers} />
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Thông tin học viên">
            <PlayersTable />
          </Card>
        </Col>
      </Row>

      <ModalClassForm {...modalClassFormState} onClose={handleCloseModalClassForm} onSuccess={getClass} />
      <ModalDeleteClass {...modalDeleteClassState} onClose={handleCloseModalDeleteClass} onSuccess={handleBack} />
    </div>
  );
};

export default ClassDetail;
