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
      Paths.Payrolls,
      Paths.Players,
      Paths.PlayerDetail(data?.id),
      Paths.TimeOffs,
      Paths.AttendancesManagers,
      Paths.AttendancesPlayers,
      Paths.Practices,
      Paths.Schedules,
      Paths.Payrolls,
      Paths.PayrollDetail(data?.id),
    ],
    children: [
      {
        id: '2-1',
        title: 'Chi nhánh',
        icon: EIconName.MapMarker,
        link: Paths.Branches,
        activePaths: [Paths.Branches],
      },
      {
        id: '2-2',
        title: 'Lớp học',
        icon: EIconName.ChalkBoard,
        link: Paths.Classes,
        activePaths: [Paths.Classes, Paths.ClassDetail(data?.id)],
      },
      {
        id: '2-2-1',
        title: 'Chi tiết Lớp học',
        icon: EIconName.ChalkBoard,
        hide: true,
        link: Paths.ClassDetail(data?.id),
        activePaths: [Paths.ClassDetail(data?.id)],
      },
      {
        id: '2-3',
        title: 'Giáo viên',
        icon: EIconName.Users,
        link: Paths.Managers,
        activePaths: [Paths.Managers, Paths.ManagerDetail(data?.id)],
      },
      {
        id: '2-3-1',
        title: 'Chi tiết Giáo viên',
        icon: EIconName.Users,
        hide: true,
        link: Paths.ManagerDetail(data?.id),
        activePaths: [Paths.ManagerDetail(data?.id)],
      },
      {
        id: '2-4',
        title: 'Học viên',
        icon: EIconName.UsersGroup,
        link: Paths.Players,
        activePaths: [Paths.Players, Paths.PlayerDetail(data?.id)],
      },
      {
        id: '2-4-1',
        title: 'Chi tiết Học viên',
        icon: EIconName.UsersGroup,
        hide: true,
        link: Paths.PlayerDetail(data?.id),
        activePaths: [Paths.PlayerDetail(data?.id)],
      },
      {
        id: '2-5',
        title: 'Học thử miễn phí',
        icon: EIconName.Rocket,
        link: Paths.Practices,
        activePaths: [Paths.Practices],
      },
      {
        id: '2-6',
        title: 'Lịch học',
        icon: EIconName.Calendar,
        link: Paths.Schedules,
        activePaths: [Paths.Schedules],
      },
      {
        id: '2-7',
        title: 'Điểm danh',
        icon: EIconName.Checkbox,
        activePaths: [Paths.AttendancesManagers, Paths.AttendancesPlayers],
        children: [
          {
            id: '2-7-1',
            title: 'Học viên',
            headerTitle: 'Điểm danh Học viên',
            icon: EIconName.UsersGroup,
            link: Paths.AttendancesPlayers,
            activePaths: [Paths.AttendancesPlayers],
          },
          {
            id: '2-7-2',
            title: 'Giáo viên',
            headerTitle: 'Điểm danh Giáo viên',
            icon: EIconName.Users,
            link: Paths.AttendancesManagers,
            activePaths: [Paths.AttendancesManagers],
          },
        ],
      },
      {
        id: '2-8',
        title: 'Yêu cầu nghỉ',
        icon: EIconName.ClockCancel,
        link: Paths.TimeOffs,
        activePaths: [Paths.TimeOffs],
      },
      {
        id: '2-9',
        title: 'Sự kiện',
        icon: EIconName.SpeakerPhone,
        link: Paths.Events,
        activePaths: [Paths.Events],
      },
      {
        id: '2-10',
        title: 'Phiếu lương',
        icon: EIconName.Ticket,
        link: Paths.Payrolls,
        activePaths: [Paths.Payrolls, Paths.PayrollDetail(data?.id)],
      },
      {
        id: '2-10-1',
        title: 'Tính Lương',
        hide: true,
        icon: EIconName.Ticket,
        link: Paths.PayrollDetail(data?.id),
        activePaths: [Paths.PayrollDetail(data?.id)],
      },
    ],
  },
  {
    id: '3',
    title: 'Giao dịch',
    icon: EIconName.CreditCard,
    link: Paths.Dashboard,
    activePaths: [Paths.Revenues, Paths.Expenses],
    children: [
      {
        id: '3-1',
        title: 'Doanh thu',
        icon: EIconName.PigMoney,
        link: Paths.Revenues,
        activePaths: [Paths.Revenues],
      },
      {
        id: '3-2',
        title: 'Chi phí',
        icon: EIconName.Coins,
        link: Paths.Expenses,
        activePaths: [Paths.Expenses],
      },
    ],
  },
  {
    id: '4',
    title: 'Dịch vụ',
    icon: EIconName.TruckDelivery,
    link: Paths.Dashboard,
    activePaths: [
      Paths.BusStops,
      Paths.PickupAttendancesForward,
      Paths.PickupAttendancesBack,
      Paths.Connects,
      Paths.ConnectDetail(data?.id),
    ],
    children: [
      {
        id: '4-1',
        title: 'Điểm đón',
        icon: EIconName.Map,
        link: Paths.BusStops,
        activePaths: [Paths.BusStops],
      },
      {
        id: '4-2',
        title: 'Điểm danh',
        headerTitle: 'Điểm danh Điểm đón',
        icon: EIconName.Checkbox,
        activePaths: [Paths.PickupAttendancesForward, Paths.PickupAttendancesBack],
        children: [
          {
            id: '4-2-1',
            title: 'Chiều đi',
            icon: EIconName.ArrowLongRight,
            link: Paths.PickupAttendancesForward,
            activePaths: [Paths.PickupAttendancesForward],
          },
          {
            id: '4-2-2',
            title: 'Chiều về',
            icon: EIconName.ArrowLongLeft,
            link: Paths.PickupAttendancesBack,
            activePaths: [Paths.PickupAttendancesBack],
          },
        ],
      },
      {
        id: '4-3',
        title: 'E-Connects',
        icon: EIconName.Affiliate,
        link: Paths.Connects,
        activePaths: [Paths.Connects, Paths.ConnectDetail(data?.id)],
      },
      {
        id: '4-3-1',
        title: 'Chi tiết E-Connects',
        icon: EIconName.Affiliate,
        hide: true,
        link: Paths.ConnectDetail(data?.id),
        activePaths: [Paths.ConnectDetail(data?.id)],
      },
    ],
  },
  {
    id: '5',
    title: 'Cửa hàng',
    icon: EIconName.ShoppingCart,
    link: Paths.Dashboard,
    activePaths: [
      Paths.Categories,
      Paths.Rewards,
      Paths.Redeems,
      Paths.Products,
      Paths.Orders,
      Paths.OrderDetail(data?.id),
      Paths.PurchaseOrders,
    ],
    children: [
      {
        id: '5-1',
        title: 'Danh mục',
        icon: EIconName.Category,
        link: Paths.Categories,
        activePaths: [Paths.Categories],
      },
      {
        id: '5-2',
        title: 'Sản phẩm',
        icon: EIconName.BoxSeam,
        link: Paths.Products,
        activePaths: [Paths.Products],
      },
      {
        id: '5-3',
        title: 'Đơn hàng',
        icon: EIconName.Receipt,
        link: Paths.Orders,
        activePaths: [Paths.Orders, Paths.OrderDetail(data?.id)],
      },
      {
        id: '5-4',
        title: 'Phần thưởng',
        icon: EIconName.Award,
        link: Paths.Rewards,
        activePaths: [Paths.Rewards],
      },
      {
        id: '5-5',
        title: 'Đổi thưởng',
        icon: EIconName.ReceiptRefund,
        link: Paths.Redeems,
        activePaths: [Paths.Redeems],
      },
      {
        id: '5-6',
        title: 'Nhập hàng',
        icon: EIconName.PackageImport,
        link: Paths.PurchaseOrders,
        activePaths: [Paths.PurchaseOrders],
      },
    ],
  },
  {
    id: '6',
    title: 'CRM',
    icon: EIconName.Database,
    link: Paths.Dashboard,
    activePaths: [Paths.Customers, Paths.Suppliers],
    children: [
      {
        id: '6-1',
        title: 'Khách hàng',
        icon: EIconName.Users,
        link: Paths.Customers,
        activePaths: [Paths.Customers],
      },
      {
        id: '6-2',
        title: 'Nhà phân phối',
        icon: EIconName.PackageImport,
        link: Paths.Suppliers,
        activePaths: [Paths.Suppliers],
      },
    ],
  },
  {
    id: '7',
    title: 'Báo cáo',
    icon: EIconName.ReportAnalytics,
    link: Paths.Dashboard,
    activePaths: [Paths.ReportInventories, Paths.ReportRevenues, Paths.ReportExpenses, Paths.ReportAttendances],
    children: [
      {
        id: '7-1',
        title: 'Điểm danh',
        icon: EIconName.Checkbox,
        link: Paths.ReportAttendances,
        activePaths: [Paths.ReportAttendances],
      },
      {
        id: '7-2',
        title: 'Doanh thu',
        icon: EIconName.PigMoney,
        link: Paths.ReportRevenues,
        activePaths: [Paths.ReportRevenues],
      },
      {
        id: '7-3',
        title: 'Chi phí',
        icon: EIconName.Coins,
        link: Paths.ReportExpenses,
        activePaths: [Paths.ReportExpenses],
      },
      {
        id: '7-4',
        title: 'Lợi nhuận',
        icon: EIconName.Graph,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '7-5',
        title: 'Bán hàng',
        icon: EIconName.Receipt,
        link: Paths.Dashboard,
        activePaths: [],
      },
      {
        id: '7-6',
        title: 'Tồn kho',
        icon: EIconName.WareHouse,
        link: Paths.ReportInventories,
        activePaths: [Paths.ReportInventories],
      },
    ],
  },
  {
    id: '8',
    title: 'Cài đặt',
    icon: EIconName.Settings,
    activePaths: [
      Paths.SettingsGeneral,
      Paths.Users,
      Paths.PricingModel,
      Paths.KitFeeDefination,
      Paths.AttendancePolicy,
      Paths.ScheduleMode,
      Paths.TransportMode,
      Paths.PaymentIntegration,
      Paths.EarnPoints,
      Paths.MyPlan,
      Paths.PlanPackages,
    ],
    children: [
      {
        id: '8-1',
        title: 'Cài đặt chung',
        icon: EIconName.Adjustments,
        link: Paths.SettingsGeneral,
        activePaths: [Paths.SettingsGeneral],
      },
      {
        id: '8-2',
        title: 'Cấu hình',
        icon: EIconName.Database,
        activePaths: [
          Paths.PricingModel,
          Paths.KitFeeDefination,
          Paths.AttendancePolicy,
          Paths.ScheduleMode,
          Paths.TransportMode,
          Paths.PaymentIntegration,
          Paths.EarnPoints,
        ],
        children: [
          {
            id: '8-2-1',
            title: 'Chính sách giá',
            icon: EIconName.Coins,
            link: Paths.PricingModel,
            activePaths: [Paths.PricingModel],
          },
          {
            id: '8-2-2',
            title: 'Combo KIT',
            icon: EIconName.Briefcase,
            link: Paths.KitFeeDefination,
            activePaths: [Paths.KitFeeDefination],
          },
          {
            id: '8-2-3',
            title: 'Điểm danh',
            icon: EIconName.Checkbox,
            link: Paths.AttendancePolicy,
            activePaths: [Paths.AttendancePolicy],
          },
          {
            id: '8-2-4',
            title: 'Lịch học',
            icon: EIconName.Calendar,
            link: Paths.ScheduleMode,
            activePaths: [Paths.ScheduleMode],
          },
          {
            id: '8-2-5',
            title: 'Điểm đón',
            icon: EIconName.Map,
            link: Paths.TransportMode,
            activePaths: [Paths.TransportMode],
          },
          {
            id: '8-2-6',
            title: 'Thanh toán',
            icon: EIconName.CreditCard,
            link: Paths.PaymentIntegration,
            activePaths: [Paths.PaymentIntegration],
          },
          {
            id: '8-2-7',
            title: 'Tích điểm',
            icon: EIconName.JewishStar,
            link: Paths.EarnPoints,
            activePaths: [Paths.EarnPoints],
          },
        ],
      },
      {
        id: '8-3',
        title: 'Quyền truy cập',
        icon: EIconName.UsersGroup,
        link: Paths.Users,
        activePaths: [Paths.Users],
      },
      {
        id: '8-4',
        title: 'Gói dịch vụ',
        icon: EIconName.BusinessPlan,
        link: Paths.MyPlan,
        activePaths: [Paths.MyPlan, Paths.PlanPackages],
      },
      {
        id: '8-4-1',
        title: 'Nâng cấp gói',
        icon: EIconName.BusinessPlan,
        link: Paths.PlanPackages,
        hide: true,
        activePaths: [Paths.PlanPackages],
      },
    ],
  },
  {
    id: '9',
    title: 'Thông tin cá nhân',
    hide: true,
    icon: EIconName.Settings,
    link: Paths.MyProfile,
    activePaths: [],
    children: [],
  },
];
