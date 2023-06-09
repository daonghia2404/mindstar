import {
  EAuditingStatus,
  EDayOfWeek,
  EDegreeType,
  ELevel,
  EOrderStatus,
  EPaymentType,
  ESalaryType,
  ETransactionStatus,
  ETransactionType,
  ETypeCheckIn,
  EUserType,
} from '@/common/enums';
import { EIconColor, EIconName } from '@/components/Icon';
import { EStatusStyleType } from '@/components/Status';
import { ETagType } from '@/components/Tags';

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
  { value: ETransactionStatus.PAID, label: 'Đã Thanh Toán', data: { statusType: EStatusStyleType.SUCCESS } },
  { value: ETransactionStatus.PENDING, label: 'Đang Xử Lý', data: { statusType: EStatusStyleType.WARNING } },
  { value: ETransactionStatus.FAILURE, label: 'Thất Bại', data: { statusType: EStatusStyleType.DANGER } },
  { value: ETransactionStatus.NEW, label: 'Mới', data: { statusType: EStatusStyleType.NORMAL } },
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

export const dataProductStatusOptions = [
  { value: EAuditingStatus.ACTIVE, label: 'Đang Bán', data: { statusType: EStatusStyleType.SUCCESS } },
  { value: EAuditingStatus.INACTIVE, label: 'Ngừng Bán', data: { statusType: EStatusStyleType.DANGER } },
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
  {
    value: ETypeCheckIn.PRESENT,
    label: 'Có Mặt',
    data: { statusType: EStatusStyleType.SUCCESS, color: EIconColor.APPLE, iconName: EIconName.Check },
  },
  {
    value: ETypeCheckIn.ABSENT,
    label: 'Vắng Mặt',
    data: { statusType: EStatusStyleType.DANGER, color: EIconColor.POMEGRANATE, iconName: EIconName.X },
  },
  {
    value: ETypeCheckIn.NONE,
    label: 'Chưa Điểm Danh',
    data: { statusType: EStatusStyleType.WARNING, color: EIconColor.SELECTIVE_YELLOW },
  },
];

export const dataPointsRangeOptions = [
  { value: '1000-', label: '> 1000', data: { fromPoint: 1000, toPoint: undefined } },
  { value: '800-1000', label: '800 - 1000', data: { fromPoint: 800, toPoint: 1000 } },
  { value: '500-800', label: '500 - 800', data: { fromPoint: 500, toPoint: 800 } },
  { value: '300-500', label: '300 - 500', data: { fromPoint: 300, toPoint: 500 } },
  { value: '200-300', label: '200 - 300', data: { fromPoint: 200, toPoint: 300 } },
  { value: '-200', label: '< 200', data: { fromPoint: undefined, toPoint: 200 } },
];

export const dataAcademySizeOptions = [
  { value: 1, label: '0-100' },
  { value: 2, label: '101-200' },
  { value: 3, label: '201-300' },
  { value: 4, label: '301-500' },
  { value: 5, label: '501-1000' },
  { value: 6, label: '>1000' },
];

export const dataUserTypeOptions = [
  { value: EUserType.ADMIN, label: 'Admin', data: { tagType: ETagType.DANGER } },
  { value: EUserType.TEACHER, label: 'Giáo Viên', data: { tagType: ETagType.NORMAL } },
  { value: EUserType.MANAGER, label: 'Quản Lý', data: { tagType: ETagType.WARNING } },
  { value: EUserType.PLAYER, label: 'Học Viên', data: { tagType: ETagType.SUCCESS } },
];

export const dataLevelOptions = [
  { value: ELevel.DIAMOND, label: 'Kim cương', data: { color: EIconColor.CERULEAN } },
  { value: ELevel.GOLD, label: 'Vàng', data: { color: EIconColor.SELECTIVE_YELLOW } },
  { value: ELevel.SILVER, label: 'Bạc', data: { color: EIconColor.SILVER } },
  { value: ELevel.FRIENDLY, label: 'Thân thiết', data: { color: EIconColor.APPLE } },
  { value: ELevel.COMMON, label: 'Tiềm năng', data: { color: EIconColor.PURPLE_HEART } },
];

export const dataTransactionTypeOptions = [
  { value: ETransactionType.PRODUCT, label: 'Sản phẩm' },
  { value: ETransactionType.MEMBERSHIP_FEE, label: 'Học phí' },
  { value: ETransactionType.SPONSORSHIP, label: 'Tài trợ' },
  { value: ETransactionType.GIFT_AND_CONTRIBUTIONS, label: 'Đóng góp & Quà tặng' },
  { value: ETransactionType.OTHER_SALES_AND_SERVICES, label: 'Dịch vụ & Bán hàng khác' },
  { value: ETransactionType.TOURNAMENT, label: 'Giải đấu' },
];
