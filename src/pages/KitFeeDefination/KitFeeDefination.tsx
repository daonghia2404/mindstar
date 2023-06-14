import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Card from '@/components/Card';
import Select, { TSelectOption } from '@/components/Select';
import { formatCurrency, showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import { EGetProductsAction, EUpdateSettingsAction, getProductsAction, updateSettingsAction } from '@/redux/actions';
import { ETypeNotification } from '@/common/enums';
import { Paths } from '@/pages/routers';
import { useOptionsPaginate } from '@/utils/hooks';
import { TUpdateSettingsResponse } from '@/services/api';

import './KitFeeDefination.scss';

const KitFeeDefination: React.FC = () => {
  const dispatch = useDispatch();

  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data
    ?.kit_fee_definitions?.kit_fee_products;
  const [kitProducts, setKitProducts] = useState<TSelectOption[]>([]);
  const updateSettingsLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateSettingsAction.UPDATE_SETTINGS],
  );
  const [form] = Form.useForm();

  const {
    options: optionsProducts,
    handleLoadMore: handleLoadMoreProducts,
    handleSearch: handleSearchProducts,
  } = useOptionsPaginate(
    getProductsAction,
    'productReducer',
    'getProductsResponse',
    EGetProductsAction.GET_PRODUCTS,
    undefined,
    {},
  );

  const handleAddProduct = (): void => {
    setKitProducts([...kitProducts, {} as any]);
  };

  const handleChangeProduct = (data?: TSelectOption, indexChange?: number): void => {
    const newData = kitProducts.map((item, index) => {
      if (index === indexChange) {
        return data as any;
      }
      return item;
    });
    setKitProducts(newData);
  };

  const handleBack = (): void => {
    navigate(Paths.SettingsGeneral);
  };

  const totalKitFee = (): number => {
    const total = kitProducts.reduce((result, item) => {
      return result + (item?.data?.selling_price || 0);
    }, 0);

    return total || 0;
  };

  const handleSubmit = (): void => {
    const body = {
      kit_fee_definitions: {
        kit_fee_products: kitProducts
          ?.filter((item) => item?.data)
          ?.map((item) => ({
            product_id: item?.value,
            product_name: item?.label,
            selling_price: item?.data?.selling_price,
          })),
      },
    };

    dispatch(updateSettingsAction.request({ body }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (response: TUpdateSettingsResponse): void => {
    setKitProducts(
      response?.data?.kit_fee_definitions?.kit_fee_products?.map((item) => ({
        value: item.product_id,
        label: item.product_name,
        data: item,
      })),
    );

    showNotification(ETypeNotification.SUCCESS, 'Cập nhật cấu hình thành công !');
  };

  useEffect(() => {
    if (settingsState) {
      setKitProducts(settingsState?.map((item) => ({ value: item.product_id, label: item.product_name, data: item })));
    }
  }, [settingsState]);

  useEffect(() => {
    if (settingsState) {
      form.setFieldsValue({});
    }
  }, [form, settingsState]);

  return (
    <div className="KitFeeDefination">
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
                    onClick={handleSubmit}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Card
            title="Cấu hình"
            suffixTitle={
              <div className="KitFeeDefination-total">
                Tổng:{` `}
                <strong>{formatCurrency({ amount: totalKitFee(), showSuffix: true })}</strong>
              </div>
            }
          >
            <Row gutter={[16, 16]}>
              {kitProducts.map((item, index) => (
                <Col span={24}>
                  <Select
                    label={`Sản phẩm ${index + 1}`}
                    value={item}
                    active
                    placeholder="Chọn dữ liệu"
                    options={optionsProducts}
                    onSearch={handleSearchProducts}
                    onLoadMore={handleLoadMoreProducts}
                    allowClear
                    showSearch
                    onChange={(option): void => handleChangeProduct(option, index)}
                  />
                </Col>
              ))}
              <Col>
                <Button
                  title="Thêm Sản Phẩm"
                  styleType={EButtonStyleType.PURPLE_TRANSPARENT}
                  iconName={EIconName.Plus}
                  iconColor={EIconColor.PURPLE_HEART}
                  onClick={handleAddProduct}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default KitFeeDefination;
