import {
  EAuditingStatus,
  EDayOfWeek,
  EDegreeType,
  EOrderStatus,
  EPaymentType,
  ESalaryType,
  ETransactionStatus,
  ETypeCheckIn,
} from '@/common/enums';
import { EIconColor } from '@/components/Icon';
import { EStatusStyleType } from '@/components/Status';

/* eslint-disable no-useless-escape */
export const REGEX = {
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
  url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
  domain: /^[a-zA-Z0-9](?:[a-zA-Z0-9-.]*[a-zA-Z0-9])?$/i,
  alphabetic: /^[a-z\s]+$/i,
  alphanumerial: /^[a-z0-9\s]+$/i,
  numeric: /^\d+$/i,
  onlySpecialKey: /[$&+,:;=?@#|'<>.^*()%`~_!\-"\]\[\\}{'/]/g,
};

export const dataTablePerPageOptions = [
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
  { label: '75', value: '75' },
  { label: '100', value: '100' },
];
export const DEFAULT_PAGE = 0;
export const DEFAULT_PAGE_SIZE = 10;

export const dataTransactionStatusOptions = [
  { value: ETransactionStatus.PAID, label: 'Đã Thanh Toán' },
  { value: ETransactionStatus.PENDING, label: 'Đang Xử Lý' },
  { value: ETransactionStatus.FAILURE, label: 'Thất Bại' },
  { value: ETransactionStatus.NEW, label: 'Mới' },
];

export const dataPaymentTypeOptions = [
  { value: EPaymentType.CASH, label: 'Tiền Mặt' },
  { value: EPaymentType.BANK, label: 'Chuyển Khoản' },
  { value: EPaymentType.NINE_PAY, label: '9Pay' },
];

export const dataOrderStatusOptions = [
  {
    value: EOrderStatus.PENDING,
    label: 'Đang Xử Lý',
    data: {
      color: EIconColor.SELECTIVE_YELLOW,
      statusType: EStatusStyleType.WARNING,
    },
  },
  {
    value: EOrderStatus.CONFIRMED,
    label: 'Xác Nhận',
    data: {
      color: EIconColor.CERULEAN,
      statusType: EStatusStyleType.SUCCESS,
    },
  },
  {
    value: EOrderStatus.CANCELLED,
    label: 'Đã Huỷ',
    data: {
      color: EIconColor.POMEGRANATE,
      statusType: EStatusStyleType.DANGER,
    },
  },
  {
    value: EOrderStatus.REFUNDED,
    label: 'Hoàn Trả',
    data: {
      color: EIconColor.SELECTIVE_YELLOW,
      statusType: EStatusStyleType.WARNING,
    },
  },
  {
    value: EOrderStatus.SHIPPER,
    label: 'Đang Giao',
    data: {
      color: EIconColor.PURPLE_HEART,
      statusType: EStatusStyleType.SUCCESS,
    },
  },
  {
    value: EOrderStatus.READY_FOR_DELIVERY,
    label: 'Chuẩn Bị Vận Chuyển',
    data: {
      color: EIconColor.CERULEAN,
      statusType: EStatusStyleType.WARNING,
    },
  },
  {
    value: EOrderStatus.COMPLETED,
    label: 'Hoàn Thành',
    data: {
      color: EIconColor.APPLE,
      statusType: EStatusStyleType.SUCCESS,
    },
  },
];

export const dataAuditingStatusOptions = [
  { value: EAuditingStatus.ACTIVE, label: 'Hoạt Động', data: { statusType: EStatusStyleType.SUCCESS } },
  { value: EAuditingStatus.INACTIVE, label: 'Ngừng Hoạt Động', data: { statusType: EStatusStyleType.DANGER } },
];

export const dataDegreeTypeOptions = [
  { value: EDegreeType.BEGINNER, label: 'Tập Sự', data: { color: EIconColor.CERULEAN } },
  { value: EDegreeType.INTERMEDIATE, label: 'Trung Cấp', data: { color: EIconColor.SELECTIVE_YELLOW } },
  { value: EDegreeType.ADVANCED, label: 'Chuyên Nghiệp', data: { color: EIconColor.POMEGRANATE } },
];

export const dataSalaryTypeOptions = [
  { value: ESalaryType.MONTHLY, label: 'Theo Tháng' },
  { value: ESalaryType.SESSION, label: 'Theo Mùa' },
];

export const dataDayOfWeeksOptions = [
  { value: EDayOfWeek.MONDAY, label: 'Thứ 2' },
  { value: EDayOfWeek.TUESDAY, label: 'Thứ 3' },
  { value: EDayOfWeek.WEDNESDAY, label: 'Thứ 4' },
  { value: EDayOfWeek.THURSDAY, label: 'Thứ 5' },
  { value: EDayOfWeek.FRIDAY, label: 'Thứ 6' },
  { value: EDayOfWeek.SATURDAY, label: 'Thứ 7' },
  { value: EDayOfWeek.SUNDAY, label: 'CN' },
];

export const dataTypeCheckInOptions = [
  { value: ETypeCheckIn.PRESENT, label: 'Có Mặt', data: { statusType: EStatusStyleType.SUCCESS } },
  { value: ETypeCheckIn.ABSENT, label: 'Vắng Mặt', data: { statusType: EStatusStyleType.DANGER } },
  { value: ETypeCheckIn.NONE, label: 'Chưa Điểm Danh', data: { statusType: EStatusStyleType.WARNING } },
];

export const dataPointsRangeOptions = [
  { value: '1000-', label: '> 1000', data: { fromPoint: 1000, toPoint: undefined } },
  { value: '800-1000', label: '800 - 1000', data: { fromPoint: 800, toPoint: 1000 } },
  { value: '500-800', label: '500 - 800', data: { fromPoint: 500, toPoint: 800 } },
  { value: '300-500', label: '300 - 500', data: { fromPoint: 300, toPoint: 500 } },
  { value: '200-300', label: '200 - 300', data: { fromPoint: 200, toPoint: 300 } },
  { value: '-200', label: '< 200', data: { fromPoint: undefined, toPoint: 200 } },
];
