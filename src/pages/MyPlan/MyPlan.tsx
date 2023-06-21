/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Col, Row } from 'antd';
import { navigate } from '@reach/router';
import moment from 'moment';

import LogoVisa from '@/assets/images/logo-visa.png';

import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Card from '@/components/Card';
import { Paths } from '@/pages/routers';
import Table from '@/components/Table';
import Avatar from '@/components/Avatar';
import DropdownMenu, { TDropdownMenuItem } from '@/components/DropdownMenu';
import { formatCurrency, formatISODateToDateTime } from '@/utils/functions';
import { EEmpty, EFormat } from '@/common/enums';
import { dataPaymentTypeOptions } from '@/common/constants';

import { dataPlans } from './MyPlan.data';
import './MyPlan.scss';

const MyPlan: React.FC = () => {
  const currentPlan = dataPlans.find((item) => item.id === 1);

  const handleBack = (): void => {
    navigate(Paths.SettingsGeneral);
  };

  const dataTableDropdownActions = (): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
    },
  ];

  const paymentHistoryColumns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      render: (): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">
            Gói:{' '}
            <strong className="uppercase" style={{ color: currentPlan?.color }}>
              {currentPlan?.title}
            </strong>
          </div>
        </div>
      ),
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      title: 'Tổng giá trị',
      className: 'nowrap',
      sorter: true,
      keySort: 'amount',
      render: (): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">
              {formatCurrency({ amount: 2990000 || EEmpty.ZERO, showSuffix: true })}
            </div>
            <div className="Table-info-description">{dataPaymentTypeOptions[0]?.label || EEmpty.DASH}</div>
          </div>
        );
      },
    },
    {
      key: 'atDate',
      dataIndex: 'atDate',
      title: 'Ngày tạo',
      sorter: true,
      keySort: 'at_date',
      className: 'nowrap',
      render: (): string => formatISODateToDateTime(moment().valueOf(), EFormat['DD/MM/YYYY - HH:mm']),
    },
    {
      key: 'short_description',
      dataIndex: 'short_description',
      title: 'Ghi chú',
      className: 'limit-width',
      render: (value: string): string => value || EEmpty.DASH,
    },
  ];

  const columns = [
    {
      key: 'logo',
      dataIndex: 'logo',
      title: '',
      width: 48,
      render: (): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={48} image={LogoVisa} defaultImage />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '',
      className: 'limit-width',
      render: (): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">Visa của tôi</div>
            <div className="Table-info-description">Số: XXXX XXXX XXXX</div>
            <div className="Table-info-description">Ngày hết hạn: 01/01/2025</div>
          </div>
        );
      },
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (): React.ReactElement => (
        <div onClick={(e): void => e.stopPropagation()}>
          <DropdownMenu placement="bottomRight" options={dataTableDropdownActions()}>
            <Button
              iconName={EIconName.DotsVertical}
              iconColor={EIconColor.BLACK}
              size="small"
              styleType={EButtonStyleType.GENERAL_FORM}
            />
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <div className="MyPlan">
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
                    title="Nâng cấp gói"
                    iconName={EIconName.ArrowBigUpLines}
                    iconColor={EIconColor.WHITE}
                    styleType={EButtonStyleType.PURPLE}
                    link={Paths.PlanPackages}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Card
            title="Gói của tôi"
            description={
              <>
                Bạn đang sử dụng gói{' '}
                <strong className="uppercase" style={{ color: currentPlan?.color }}>
                  "{currentPlan?.title}"
                </strong>
                .
                <br />
                Nâng cấp để truy cập vào các tính năng giúp tiết kiệm thời gian cho doanh nghiệp của bạn phát triển.
              </>
            }
          >
            <div
              className="MyPlan-description text-right"
              style={{ color: EIconColor.POMEGRANATE, marginBottom: '1.2rem' }}
            >
              Ngày hết hạn: 31/12/2025 (còn lại 300 ngày)
            </div>

            <div className="MyPlan-progress">
              <div className="MyPlan-progress-item">
                <div className="MyPlan-progress-item-header flex items-center justify-between">
                  <div className="MyPlan-progress-item-header-title">Học viên</div>
                  <div className="MyPlan-progress-item-header-title">8/10</div>
                </div>
                <div className="MyPlan-progress-item-bar">
                  <div className="MyPlan-progress-item-bar-line" style={{ width: '80%' }} />
                </div>
              </div>

              <div className="MyPlan-progress-item">
                <div className="MyPlan-progress-item-header flex items-center justify-between">
                  <div className="MyPlan-progress-item-header-title">Người dùng</div>
                  <div className="MyPlan-progress-item-header-title">1/1</div>
                </div>
                <div className="MyPlan-progress-item-bar">
                  <div className="MyPlan-progress-item-bar-line" style={{ width: '100%' }} />
                </div>
              </div>
            </div>

            <div className="MyPlan-list">
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <div className="MyPlan-list-item flex">
                    <Icon name={EIconName.Checkbox} color={EIconColor.APPLE} />
                    Quản lý tối đa 100 người
                  </div>
                </Col>
                <Col span={12}>
                  <div className="MyPlan-list-item flex">
                    <Icon name={EIconName.Checkbox} color={EIconColor.APPLE} />
                    Thanh toán theo năm
                  </div>
                </Col>
                <Col span={12}>
                  <div className="MyPlan-list-item flex">
                    <Icon name={EIconName.Checkbox} color={EIconColor.APPLE} />
                    Cập nhật liên tục
                  </div>
                </Col>
                <Col span={12}>
                  <div className="MyPlan-list-item flex">
                    <Icon name={EIconName.Checkbox} color={EIconColor.APPLE} />
                    Hỗ trợ 24/7
                  </div>
                </Col>
                <Col span={12}>
                  <div className="MyPlan-list-item flex">
                    <Icon name={EIconName.Checkbox} color={EIconColor.APPLE} />
                    iOS App dành riêng
                  </div>
                </Col>
                <Col span={12}>
                  <div className="MyPlan-list-item flex">
                    <Icon name={EIconName.Checkbox} color={EIconColor.APPLE} />
                    Android App dành riêng
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Card
            title="Phương thức thanh toán"
            description="Thêm các thẻ Visa, Paypal hoặc thẻ Tín Dụng giúp thanh toán dễ dàng và nhanh chóng."
          >
            <div className="MyPlan-methods">
              <Table columns={columns} dataSources={[1]} />
              <div className="flex" style={{ marginTop: '1.6rem' }}>
                <Button
                  title="Thêm phương thức"
                  styleType={EButtonStyleType.PURPLE_TRANSPARENT}
                  iconName={EIconName.Plus}
                  iconColor={EIconColor.PURPLE_HEART}
                />
              </div>
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Lịch sử thanh toán">
            <Table columns={paymentHistoryColumns} dataSources={[1, 2, 3]} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MyPlan;
