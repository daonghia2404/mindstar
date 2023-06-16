import { EPriceCardType } from '@/components/PriceCard/PriceCard.enums';

export const dataPackages = [
  {
    title: 'BẮT ĐẦU',
    type: EPriceCardType.STARTER,
    price: '500.000',
    priceSetup: '20.000.000 đ',
    listFeature: [
      { value: '1', label: 'Quản lý tối đa 100 người' },
      { value: '2', label: 'Thanh toán theo năm' },
      { value: '3', label: 'Cập nhật liên tục' },
      { value: '4', label: 'Hỗ trợ 24/7' },
    ],
    listSetup: [
      { value: '1', label: 'iOS App dành riêng' },
      { value: '2', label: 'Android App dành riêng' },
    ],
  },
  {
    title: 'PHÁT TRIỂN',
    type: EPriceCardType.DEVELOPER,
    hightlight: true,
    price: '1.000.000',
    priceSetup: '20.000.000 đ',
    listFeature: [
      { value: '1', label: 'Quản lý tối đa 100 người' },
      { value: '2', label: 'Thanh toán theo năm' },
      { value: '3', label: 'Cập nhật liên tục' },
      { value: '4', label: 'Hỗ trợ 24/7' },
    ],
    listSetup: [
      { value: '1', label: 'iOS App dành riêng' },
      { value: '2', label: 'Android App dành riêng' },
    ],
  },
  {
    title: 'CHUYÊN NGHIỆP',
    type: EPriceCardType.PROFESSIONAL,
    price: '2.500.000',
    priceSetup: '20.000.000 đ',
    listFeature: [
      { value: '1', label: 'Quản lý tối đa 100 người' },
      { value: '2', label: 'Thanh toán theo năm' },
      { value: '3', label: 'Cập nhật liên tục' },
      { value: '4', label: 'Hỗ trợ 24/7' },
    ],
    listSetup: [
      { value: '1', label: 'iOS App dành riêng' },
      { value: '2', label: 'Android App dành riêng' },
    ],
  },
  {
    title: 'TRUNG TÂM, HỌC VIỆN',
    type: EPriceCardType.ACADEMY,
    price: '5.000.000',
    priceSetup: '20.000.000 đ',
    listFeature: [
      { value: '1', label: 'Quản lý tối đa 100 người' },
      { value: '2', label: 'Thanh toán theo năm' },
      { value: '3', label: 'Cập nhật liên tục' },
      { value: '4', label: 'Hỗ trợ 24/7' },
    ],
    listSetup: [
      { value: '1', label: 'iOS App dành riêng' },
      { value: '2', label: 'Android App dành riêng' },
    ],
  },
];
