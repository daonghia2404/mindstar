import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { navigate, useParams } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Card from '@/components/Card';
import { Paths } from '@/pages/routers';
import { EGetMerchantFeedsAction, getMerchantAction, getMerchantFeedsAction } from '@/redux/actions';
import { formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import ModalDeleteConnect from '@/pages/Connects/ModalDeleteConnect';
import { TMerchant, TMerchantFeed } from '@/common/models';
import Table from '@/components/Table';
import Avatar from '@/components/Avatar';
import Switch from '@/components/Switch';
import { TGetMerchantFeedsParams } from '@/services/api';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { TRootState } from '@/redux/reducers';

import './ConnectDetail.scss';
import { EAuditingStatus, EEmpty, EFormat } from '@/common/enums';
import ModalChangeStatusMerchantFeed from '@/pages/ConnectDetail/ModalChangeStatusMerchantFeed';
import Empty from '@/components/Empty';
import Carousels from '@/components/Carousels';

const ConnectDetail: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const merchantState = useSelector((state: TRootState) => state.merchantReducer?.getMerchantResponse)?.data;
  const merchantFeedsState = useSelector((state: TRootState) => state.merchantReducer?.getMerchantFeedsResponse)?.data;
  const getMerchantFeedsLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetMerchantFeedsAction.GET_MERCHANT_FEEDS],
  );
  const [currentSelectedMerchantFeedId, setCurrentSelectedMerchantFeedId] = useState<number>();
  const currentMerchantFeed = merchantFeedsState?.content?.find((item) => item.id === currentSelectedMerchantFeedId);

  const [getMerchantFeedsParamsRequest, setGetMerchantFeedsParamsRequest] = useState<TGetMerchantFeedsParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    merchantId: id,
    auditingStatus: `${EAuditingStatus.ACTIVE},${EAuditingStatus.INACTIVE}`,
  });

  const [modalChangeStatusMerchantFeedState, setModalChangeStatusMerchantFeedState] = useState<{
    visible: boolean;
    checked?: boolean;
    data?: TMerchantFeed;
  }>({ visible: false });

  const [modalDeleteMerchantState, setModalDeleteMerchantState] = useState<{ visible: boolean; data?: TMerchant }>({
    visible: false,
  });

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetMerchantFeedsParamsRequest({
      ...getMerchantFeedsParamsRequest,
      page,
      size,
      sort,
    });
  };

  const columns = [
    {
      key: 'image',
      dataIndex: 'image',
      title: 'Ảnh',
      width: 72,
      render: (_: string, record: TMerchantFeed): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={72} image={getFullUrlStatics(record?.files?.[0]?.path)} defaultImage shape="square" />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tiêu đề',
      render: (_: string, record: TMerchantFeed): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title ellipsis-1">{record?.content || EEmpty.DASH}</div>
          <div className="Table-info-description">
            {record?.create_date
              ? formatISODateToDateTime(record.create_date, EFormat['DD/MM/YYYY - HH:mm'])
              : EEmpty.DASH}
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      render: (_: string, record: TMerchantFeed): React.ReactElement => (
        <Switch
          value={Boolean(record?.auditing_status)}
          readOnlyText
          onChange={(checked): void => handleOpenChangeStatusMerchantFeed(checked, record)}
        />
      ),
    },
  ];

  const handleOpenModalDeleteMerchant = (data?: TMerchant): void => {
    setModalDeleteMerchantState({ visible: true, data });
  };

  const handleCloseModalDeleteMerchant = (): void => {
    setModalDeleteMerchantState({ visible: false });
  };

  const handleOpenChangeStatusMerchantFeed = (checked: boolean, data?: TMerchantFeed): void => {
    setModalChangeStatusMerchantFeedState({ visible: true, checked, data });
  };
  const handleCloseChangeStatusMerchantFeed = (): void => {
    setModalChangeStatusMerchantFeedState({ visible: false });
  };

  const handleBack = (): void => {
    navigate(Paths.Connects);
  };

  const getMerchant = useCallback(() => {
    if (id) dispatch(getMerchantAction.request({ paths: { id } }));
  }, [dispatch, id]);

  const getMerchantFeeds = useCallback(() => {
    if (id)
      dispatch(
        getMerchantFeedsAction.request({ params: getMerchantFeedsParamsRequest }, (response): void => {
          const isIncludeExistedBusStopId = response?.data?.content
            ?.map((item) => item.id)
            .includes(currentSelectedMerchantFeedId as number);

          setCurrentSelectedMerchantFeedId(
            isIncludeExistedBusStopId ? currentSelectedMerchantFeedId : response?.data?.content?.[0]?.id,
          );
        }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getMerchantFeedsParamsRequest, id]);

  useEffect(() => {
    getMerchant();
  }, [getMerchant]);

  useEffect(() => {
    getMerchantFeeds();
  }, [getMerchantFeeds]);

  return (
    <div className="ConnectDetail">
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
                    title="Xoá"
                    styleType={EButtonStyleType.DANGER_TRANSPARENT}
                    iconName={EIconName.Trash}
                    iconColor={EIconColor.POMEGRANATE}
                    onClick={(): void => handleOpenModalDeleteMerchant(merchantState)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Card title="Danh sách bài viết">
            <Table
              loading={getMerchantFeedsLoading}
              columns={columns}
              dataSources={merchantFeedsState?.content || []}
              page={getMerchantFeedsParamsRequest?.page}
              pageSize={getMerchantFeedsParamsRequest?.size}
              total={merchantFeedsState?.total_elements}
              rowClassName={(record: TMerchantFeed): string =>
                classNames('cursor-pointer', { 'hightlight': record.id === currentSelectedMerchantFeedId })
              }
              onRow={(record: TMerchantFeed): any => ({
                onClick: (): void => {
                  setCurrentSelectedMerchantFeedId(record.id);
                },
              })}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Card title="Thông tin bài viết">
            {currentMerchantFeed ? (
              <div className="ConnectDetail-detail">
                <div className="ConnectDetail-detail-carousel">
                  <Carousels slidesToShow={1} slidesToScroll={1} infinite={false} dots={false} arrows autoplay>
                    {currentMerchantFeed?.files?.map((item) => (
                      <div className="ConnectDetail-detail-carousel-item">
                        <img src={getFullUrlStatics(item.path)} alt="" />
                      </div>
                    ))}
                  </Carousels>
                </div>
                <div className="ConnectDetail-detail-content">{currentMerchantFeed?.content || EEmpty.DASH}</div>
              </div>
            ) : (
              <Empty />
            )}
          </Card>
        </Col>
      </Row>

      <ModalDeleteConnect
        {...modalDeleteMerchantState}
        onClose={handleCloseModalDeleteMerchant}
        onSuccess={handleBack}
      />
      <ModalChangeStatusMerchantFeed
        {...modalChangeStatusMerchantFeedState}
        onClose={handleCloseChangeStatusMerchantFeed}
        onSuccess={getMerchantFeeds}
      />
    </div>
  );
};

export default ConnectDetail;
