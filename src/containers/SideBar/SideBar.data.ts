import { EIconName } from '@/components/Icon';
import { TSideBarData } from '@/containers/SideBar/SideBar.types';
import { Paths } from '@/pages/routers';

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
    activePaths: [Paths.Branches, Paths.Managers, Paths.ManagerDetail(data?.id)],
    children: [
      {
        id: '1',
        title: 'Chi nhánh',
        icon: EIconName.GitBranch,
        link: Paths.Branches,
        activePaths: [Paths.Branches],
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
        id: '3',
        title: 'Lớp học',
        icon: EIconName.ChalkBoard,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '4',
        title: 'Tập thử miễn phí',
        icon: EIconName.Rocket,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '5',
        title: 'Học viên',
        icon: EIconName.Users,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '6',
        title: 'Lịch tập',
        icon: EIconName.Calendar,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '7',
        title: 'Điểm danh',
        icon: EIconName.Users,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '8',
        title: 'Thời gian nghỉ',
        icon: EIconName.ClockCancel,
        link: Paths.Breaks,
        activePaths: [],
      },
      {
        id: '8',
        title: 'Sự kiện',
        icon: EIconName.SpeakerPhone,
        link: Paths.Dashboard,
        activePaths: [],
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
    activePaths: [],
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
        link: Paths.Dashboard,
        activePaths: [],
      },
    ],
  },
  {
    id: '5',
    title: 'Cửa hàng',
    icon: EIconName.ShoppingCart,
    link: Paths.Dashboard,
    activePaths: [],
    children: [
      {
        id: '1',
        title: 'Danh mục',
        icon: EIconName.Category,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '2',
        title: 'Sản phẩm',
        icon: EIconName.BoxSeam,
        link: Paths.Dashboard,
        activePaths: [],
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
        link: Paths.Dashboard,
        activePaths: [],
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
        icon: EIconName.Users,
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
