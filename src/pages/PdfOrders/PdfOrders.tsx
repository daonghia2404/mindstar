import React, { useEffect } from 'react';
import { PDFViewer, Page, Text, Image, Font, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useDispatch, useSelector } from 'react-redux';

import { EIconColor } from '@/components/Icon';
import { formatCurrency, formatISODateToDateTime, getFullUrlStatics, getQueryParam } from '@/utils/functions';
import { EEmpty, EFormat } from '@/common/enums';
import { TOrder } from '@/common/models';
import { dataPaymentTypeOptions } from '@/common/constants';
import { EGetOrdersAction, getOrdersAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';

import './PdfOrders.scss';
import Loading from '@/components/Loading';

// Create styles
Font.register({
  family: 'PlusJakartaSans',
  fonts: [
    {
      src: '/fonts/PlusJakartaSans-Bold.ttf',
      fontWeight: 700,
    },
    {
      src: '/fonts/PlusJakartaSans-SemiBold.ttf',
      fontWeight: 600,
    },
    {
      src: '/fonts/PlusJakartaSans-Medium.ttf',
      fontWeight: 500,
    },
    {
      src: '/fonts/PlusJakartaSans-Regular.ttf',
      fontWeight: 400,
    },
    {
      src: '/fonts/PlusJakartaSans-Light.ttf',
      fontWeight: 300,
    },
  ],
});

const styles = StyleSheet.create({
  page: {},
  header: {
    display: 'flex',
    padding: 16,
  },
  footer: {
    padding: 16,
    paddingBottom: 24,
    marginTop: 32,
  },
  body: {
    display: 'flex',
    padding: 16,
  },
  headerLogo: {
    display: 'flex',
    width: 80,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: 'PlusJakartaSans',
    color: EIconColor.MINE_SHAFT,
  },
  title: { fontSize: 10, fontWeight: 500, fontFamily: 'PlusJakartaSans', color: EIconColor.TUNDORA, marginBottom: 4 },
  description: {
    fontSize: 10,
    fontWeight: 400,
    fontFamily: 'PlusJakartaSans',
    color: EIconColor.DOVE_GRAY,
  },
  bold: {
    fontWeight: 700,
  },

  card: {
    backgroundColor: EIconColor.WHITE,
    padding: 24,
    borderRadius: 8,
    marginTop: 32,
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
    marginBottom: 24,
  },
  cardHeaderItem: {},
  cardBody: {},

  table: {},
  tableHeader: {},
  tableBody: {},
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: EIconColor.SILVER,
  },
  tableCell: {
    display: 'flex',
    padding: 12,
  },
  tableCell1: { flexGrow: 0, flexShrink: 0, flexBasis: 100, maxWidth: 100, width: 100 },
  tableCell2: { flexGrow: 0, flexShrink: 0, flexBasis: 220, maxWidth: 220, width: 220 },
  tableCell3: { flexGrow: 0, flexShrink: 0, flexBasis: 220, maxWidth: 220, width: 220 },
  tableCell4: { flexGrow: 0, flexShrink: 0, flexBasis: 110, maxWidth: 110, width: 110 },
  tableCell5: { flexGrow: 0, flexShrink: 0, flexBasis: 130, maxWidth: 130, width: 130 },

  products: {},
  productsItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    paddingTop: 8,
    paddingBottom: 8,
  },
  productsItemImage: {
    flexGrow: 0,
    flexShrink: 0,
    maxWidth: 40,
    width: 40,
    flexBasis: 40,
    height: 40,
    objectFit: 'cover',
    backgroundColor: EIconColor.SILVER,
  },
  productsItemInfo: {
    flex: 1,
  },
});

const PdfOrders: React.FC = () => {
  const dispatch = useDispatch();
  const fromDate = getQueryParam('fromDate');
  const toDate = getQueryParam('toDate');
  const branchIds = getQueryParam('branchId');

  const getOrdersLoading = useSelector((state: TRootState) => state.loadingReducer[EGetOrdersAction.GET_ORDERS]);
  const ordersState = useSelector((state: TRootState) => state.orderReducer.getOrdersResponse)
    ?.data as unknown as TOrder[];

  useEffect(() => {
    dispatch(
      getOrdersAction.request({
        isShowAll: true,
        params: { fromDate: fromDate ? Number(fromDate) : undefined, toDate: toDate ? Number(toDate) : undefined },
        headers: { branchIds: branchIds || '' },
      }),
    );
  }, [dispatch, fromDate, toDate, branchIds]);

  return !ordersState || getOrdersLoading ? (
    <div className="flex items-center justify-center" style={{ height: '100vh' }}>
      <Loading />
    </div>
  ) : (
    <PDFViewer showToolbar style={{ width: '100%', height: '100vh' }}>
      <Document title="Bảng Thống Kê Đơn Hàng">
        <Page size="A4" orientation="landscape">
          <View style={{ backgroundColor: '#d9d9d933' }}>
            <View style={styles.header}>
              <Image
                src={{
                  uri: '/logo.png',
                  method: 'GET',
                  headers: {},
                  body: undefined,
                }}
                style={styles.headerLogo}
              />
            </View>

            <View style={styles.body}>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.heroTitle}>BẢNG THỐNG KÊ ĐƠN HÀNG</Text>
              </View>
              <View>
                <Text style={styles.description}>
                  Từ ngày{' '}
                  <Text style={styles.bold}>
                    {fromDate ? formatISODateToDateTime(Number(fromDate), EFormat['DD/MM/YYYY']) : `-∞`}
                  </Text>{' '}
                  đến ngày{' '}
                  <Text style={styles.bold}>
                    {toDate ? formatISODateToDateTime(Number(toDate), EFormat['DD/MM/YYYY']) : `+∞`}
                  </Text>
                </Text>
              </View>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardHeaderItem}>
                    <Text style={[styles.description, { color: EIconColor.TUNDORA }]}>
                      Tổng Đơn Hàng:{` `}
                      <Text style={styles.bold}>{ordersState?.length || EEmpty.ZERO}</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.cardBody}>
                  <View style={styles.table}>
                    <View style={styles.tableHeader}>
                      <View style={styles.tableRow}>
                        <View style={[styles.tableCell, styles.tableCell1]}>
                          <Text style={[styles.description, { color: EIconColor.TUNDORA, fontWeight: 700 }]}>
                            Mã Đơn Hàng
                          </Text>
                        </View>
                        <View style={[styles.tableCell, styles.tableCell2]}>
                          <Text style={[styles.description, { color: EIconColor.TUNDORA, fontWeight: 700 }]}>
                            Sản Phẩm
                          </Text>
                        </View>
                        <View style={[styles.tableCell, styles.tableCell3]}>
                          <Text style={[styles.description, { color: EIconColor.TUNDORA, fontWeight: 700 }]}>
                            Khách Hàng
                          </Text>
                        </View>
                        <View style={[styles.tableCell, styles.tableCell4]}>
                          <Text style={[styles.description, { color: EIconColor.TUNDORA, fontWeight: 700 }]}>
                            Tổng Giá Trị
                          </Text>
                        </View>
                        <View style={[styles.tableCell, styles.tableCell5]}>
                          <Text style={[styles.description, { color: EIconColor.TUNDORA, fontWeight: 700 }]}>
                            Ngày Mua
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.tableBody}>
                      {ordersState?.map((item: TOrder) => {
                        const isEmptyProducts = item?.items?.length === 0;

                        return (
                          <View style={styles.tableRow}>
                            <View style={[styles.tableCell, styles.tableCell1]}>
                              <Text style={[styles.description, { color: EIconColor.TUNDORA }]}>ORD{item.id}</Text>
                            </View>
                            <View style={[styles.tableCell, styles.tableCell2]}>
                              {isEmptyProducts ? (
                                <Text style={[styles.description, { color: EIconColor.TUNDORA }]}>{EEmpty.DASH}</Text>
                              ) : (
                                <View style={styles.products}>
                                  {item?.items?.map((product, productIndex) => {
                                    const isLastItem = productIndex === item?.items?.length - 1;

                                    return (
                                      <View
                                        style={[
                                          styles.productsItem,
                                          {
                                            alignItems: 'flex-start',
                                            borderBottomWidth: isLastItem ? 0 : 1,
                                            borderStyle: 'dashed',
                                            borderColor: EIconColor.SILVER,
                                          },
                                        ]}
                                      >
                                        <Image
                                          src={{
                                            uri: getFullUrlStatics(product?.product_image_path),
                                            method: 'GET',
                                            headers: {},
                                            body: undefined,
                                          }}
                                          style={styles.productsItemImage}
                                        />
                                        <View style={styles.productsItemInfo}>
                                          <Text style={styles.title}>{product?.product_name}</Text>
                                          <Text style={styles.description}>
                                            Số lượng: {product?.quantity || EEmpty.ZERO}
                                          </Text>
                                        </View>
                                      </View>
                                    );
                                  })}
                                </View>
                              )}
                            </View>
                            <View style={[styles.tableCell, styles.tableCell3]}>
                              <View style={styles.products}>
                                <View style={styles.productsItem}>
                                  <Image
                                    src={{
                                      uri: item.customer_info?.avatar,
                                      method: 'GET',
                                      headers: {},
                                      body: undefined,
                                    }}
                                    style={[styles.productsItemImage, { borderRadius: '50%' }]}
                                  />
                                  <View style={styles.productsItemInfo}>
                                    <Text style={styles.title}>{item?.customer_info?.name}</Text>
                                    <Text style={[styles.description, { marginBottom: 4 }]}>
                                      {item?.customer_info?.address || EEmpty.DASH}
                                    </Text>
                                    <Text style={styles.description}>{item?.customer_info?.mobile || EEmpty.DASH}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                            <View style={[styles.tableCell, styles.tableCell4]}>
                              <Text style={[styles.description, { color: EIconColor.TUNDORA, marginBottom: 4 }]}>
                                {formatCurrency({ amount: item.transaction_amount, showSuffix: true })}
                              </Text>
                              <Text style={[styles.description]}>
                                {dataPaymentTypeOptions.find((option) => option.value === item.payment_type)?.label ||
                                  EEmpty.DASH}
                              </Text>
                            </View>
                            <View style={[styles.tableCell, styles.tableCell5]}>
                              <Text style={[styles.description, { color: EIconColor.TUNDORA }]}>
                                {item?.create_date
                                  ? formatISODateToDateTime(item.create_date, EFormat['DD/MM/YYYY - HH:mm'])
                                  : EEmpty.DASH}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              <Text style={[styles.description, { color: EIconColor.TUNDORA, textAlign: 'right' }]}>
                © Copyright 2023 Acazia Software Company. All rights reserved
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfOrders;
