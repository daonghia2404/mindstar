import { EIconName } from '@/components/Icon';
import { TSideBarData } from '@/containers/SideBar/SideBar.types';
import { Paths } from '@/pages/routers';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const dataSideBar = (data?: any): TSideBarData[] => [
  {
    id: '1',
    title: 'Thống kê',
    icon: EIconName.Dashboard,
    link: Paths.Dashboard,
    activePaths: [Paths.Dashboard],
    children: [],
  },
  {
    id: '2',
    title: 'Học viện',
    icon: EIconName.School,
    activePaths: [
      Paths.Branches,
      Paths.Managers,
      Paths.ManagerDetail(data?.id),
      Paths.Classes,
      Paths.ClassDetail(data?.id),
      Paths.Events,
      Paths.Players,
      Paths.PlayerDetail(data?.id),
      Paths.TimeOffs,
      Paths.Attendances,
      Paths.Practices,
      Paths.Schedules,
    ],
    children: [
      {
        id: '1',
        title: 'Chi nhánh',
        icon: EIconName.MapMarker,
        link: Paths.Branches,
        activePaths: [Paths.Branches],
      },
      {
        id: '3',
        title: 'Lớp học',
        icon: EIconName.ChalkBoard,
        link: Paths.Classes,
        activePaths: [Paths.Classes, Paths.ClassDetail(data?.id)],
      },
      {
        id: '3-1',
        title: 'Chi tiết Lớp học',
        icon: EIconName.ChalkBoard,
        hide: true,
        link: Paths.ClassDetail(data?.id),
        activePaths: [Paths.ClassDetail(data?.id)],
      },
      {
        id: '2',
        title: 'Giáo viên',
        icon: EIconName.Users,
        link: Paths.Managers,
        activePaths: [Paths.Managers, Paths.ManagerDetail(data?.id)],
      },
      {
        id: '2-1',
        title: 'Chi tiết Giáo viên',
        icon: EIconName.Users,
        hide: true,
        link: Paths.ManagerDetail(data?.id),
        activePaths: [Paths.ManagerDetail(data?.id)],
      },
      {
        id: '5',
        title: 'Học viên',
        icon: EIconName.UsersGroup,
        link: Paths.Players,
        activePaths: [Paths.Players, Paths.PlayerDetail(data?.id)],
      },
      {
        id: '5-1',
        title: 'Chi tiết Học viên',
        icon: EIconName.UsersGroup,
        hide: true,
        link: Paths.PlayerDetail(data?.id),
        activePaths: [Paths.PlayerDetail(data?.id)],
      },
      {
        id: '4',
        title: 'Học thử miễn phí',
        icon: EIconName.Rocket,
        link: Paths.Practices,
        activePaths: [Paths.Practices],
      },
      {
        id: '6',
        title: 'Lịch học',
        icon: EIconName.Calendar,
        link: Paths.Schedules,
        activePaths: [Paths.Schedules],
      },
      {
        id: '7',
        title: 'Điểm danh',
        icon: EIconName.Checkbox,
        link: Paths.Attendances,
        activePaths: [Paths.Attendances],
      },
      {
        id: '8',
        title: 'Thời gian nghỉ',
        icon: EIconName.ClockCancel,
        link: Paths.TimeOffs,
        activePaths: [Paths.TimeOffs],
      },
      {
        id: '8',
        title: 'Sự kiện',
        icon: EIconName.SpeakerPhone,
        link: Paths.Events,
        activePaths: [Paths.Events],
      },
    ],
  },
  {
    id: '3',
    title: 'Giao dịch',
    icon: EIconName.CreditCard,
    link: Paths.Dashboard,
    activePaths: [],
    children: [
      {
        id: '1',
        title: 'Doanh thu',
        icon: EIconName.PigMoney,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '2',
        title: 'Chi phí',
        icon: EIconName.Coins,
        link: Paths.Dashboard,
        activePaths: [],
      },
    ],
  },
  {
    id: '4',
    title: 'Dịch vụ',
    icon: EIconName.TruckDelivery,
    link: Paths.Dashboard,
    activePaths: [Paths.Connects],
    children: [
      {
        id: '1',
        title: 'Điểm đón',
        icon: EIconName.Map,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '2',
        title: 'Điểm danh',
        icon: EIconName.Checkbox,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '3',
        title: 'E-Connects',
        icon: EIconName.Affiliate,
        link: Paths.Connects,
        activePaths: [Paths.Connects],
      },
    ],
  },
  {
    id: '5',
    title: 'Cửa hàng',
    icon: EIconName.ShoppingCart,
    link: Paths.Dashboard,
    activePaths: [Paths.Categories, Paths.Rewards, Paths.Products],
    children: [
      {
        id: '1',
        title: 'Danh mục',
        icon: EIconName.Category,
        link: Paths.Categories,
        activePaths: [Paths.Categories],
      },
      {
        id: '2',
        title: 'Sản phẩm',
        icon: EIconName.BoxSeam,
        link: Paths.Products,
        activePaths: [Paths.Products],
      },
      {
        id: '3',
        title: 'Đơn hàng',
        icon: EIconName.Receipt,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '4',
        title: 'Phần thưởng',
        icon: EIconName.Award,
        link: Paths.Rewards,
        activePaths: [Paths.Rewards],
      },
      {
        id: '5',
        title: 'Đổi thưởng',
        icon: EIconName.ReceiptRefund,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '6',
        title: 'Nhập hàng',
        icon: EIconName.PackageImport,
        link: Paths.Dashboard,
        activePaths: [],
      },
    ],
  },
  {
    id: '6',
    title: 'CRM',
    icon: EIconName.Database,
    link: Paths.Dashboard,
    activePaths: [],
    children: [
      {
        id: '1',
        title: 'Khách hàng',
        icon: EIconName.Users,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '2',
        title: 'Nhà phân phối',
        icon: EIconName.PackageImport,
        link: Paths.Dashboard,
        activePaths: [],
      },
    ],
  },
  {
    id: '7',
    title: 'Báo cáo',
    icon: EIconName.ReportAnalytics,
    link: Paths.Dashboard,
    activePaths: [],
    children: [
      {
        id: '1',
        title: 'Điểm danh',
        icon: EIconName.Checkbox,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '2',
        title: 'Doanh thu',
        icon: EIconName.PigMoney,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '3',
        title: 'Chi phí',
        icon: EIconName.Coins,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '4',
        title: 'Lợi nhuận',
        icon: EIconName.Graph,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '5',
        title: 'Bán hàng',
        icon: EIconName.Receipt,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '6',
        title: 'Tồn kho',
        icon: EIconName.WareHouse,
        link: Paths.Dashboard,
        activePaths: [],
      },
    ],
  },
  {
    id: '8',
    title: 'Cài đặt',
    icon: EIconName.Settings,
    link: Paths.Dashboard,
    activePaths: [],
    children: [
      {
        id: '1',
        title: 'Cài đặt chung',
        icon: EIconName.Adjustments,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '2',
        title: 'Quyền truy cập',
        icon: EIconName.UsersGroup,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '3',
        title: 'Gói dịch vụ',
        icon: EIconName.BusinessPlan,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '4',
        title: 'Dữ liệu cấu hình',
        icon: EIconName.Database,
        link: Paths.Dashboard,
        activePaths: [],
      },
    ],
  },
];
