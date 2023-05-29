export type TUser = {
  academy_id: number;
  address: string;
  auditing_status: number;
  avatar: string;
  branch_id: null;
  branch_name: string;
  class: TClass;
  city: TCity;
  date_of_birth: number;
  id: number;
  latest_login_at: number;
  level_id: null;
  merchant: TMerchant[];
  mobile: string;
  salary_type?: string;
  salary?: number;
  note?: string;
  degree_type?: number;
  classes?: TClass[];
  total_income?: number;
  name: string;
  point_earned: null;
  points: number;
  points_reduce: null;
  referral_code: string;
  roles: TRole[];
  unread_number: number;
  update_date: number;
  user_name: string;
  user_type: string;
  user?: TUser;
  parent_name?: string;
  create_date?: number;
  clothes_number?: number;
  player_schedules?: TSchedule[];
  transaction_amount?: number;
  referral_code_used?: string;
  number_of_units?: number;
  position?: string;
};

export type TCity = {
  id: string;
  name: string;
};

export type TMerchant = {
  account_name: string;
  address: string;
  auditing_status: number;
  avatar: string;
  branch_id: number;
  city: TCity;
  city_id: string;
  cover_image: string;
  create_date: number;
  id: number;
  is_agree_promotion: boolean;
  mobile: string;
  name: string;
  registration_status: number;
  update_date: number;
  user_id: number;
};

export type TRole = {
  id: number;
  description: string;
  role_name: string;
};

export type TSetting = {
  academy_setting: unknown;
  attendance_settings: unknown;
  categories: unknown;
  cities: TCity[];
  common_settings: {
    mobile_app_version: string;
    web_app_version: string;
  };
  enable_transport: boolean;
  expense_settings: unknown;
  facebook_settings: unknown;
  kit_fee_definitions: {
    kit_fee_products: TProduct[];
  };
  ninepay_payment_settings: unknown;
  notification_settings: unknown;
  payment_settings: unknown;
  point_settings: unknown;
  reactive_settings: unknown;
  reward_tiers: unknown;
  schedule_settings: unknown;
  transaction_settings: unknown;
  transport_settings: unknown;
};

export type TBranch = {
  academy_id: number;
  address: string;
  auditing_status: number;
  city: TCity;
  count_player: number;
  create_date: number;
  description: string;
  id: number;
  managers: TUser[];
  name: string;
  personal_contact: unknown;
  primary_contact: string;
  update_date: number;
};

export type TDashboard = {
  attendance_count: number;
  branch_count: number;
  class_count: number;
  free_trial_count: number;
  manager_count: number;
  order_count: number;
  player_count: number;
  product_selling_count: number;
  start_year: number;
  user_admin_count: number;
  user_manager_count: number;
  user_player_count: number;
};

export type TExpense = {
  amount: number;
  at_date: number;
  auditing_status: number;
  category: TCategory;
  create_date: number;
  id: number;
  note: string;
  payment_type: number;
  product_name: string;
  receiver: TUser;
  status: number;
  update_date: number;
};

export type TCategory = {
  auditing_status: number;
  description: string;
  id: number;
  name: string;
  type: unknown;
};

export type TTransaction = {
  amount: number;
  at_date: number;
  auditing_status: number;
  branch: TBranch;
  buyer: TUser;
  buyer_class: TClass;
  create_date: number;
  id: number;
  payment_type: number;
  product_id: number;
  short_description: null;
  title: null;
  transaction_detail_type: number;
  transaction_status: number;
  update_date: number;
};

export type TSchedule = {
  at_date: number;
  at_eras: string;
  day_of_week: string;
  at_months: string;
  at_time: number;
  auditing_status: number;
  class: TClass;
  create_date: number;
  duration_in_second: number;
  event: TEvent;
  id: number;
  repeat_type: number;
  update_date: number;
};

export type TClass = {
  id: number;
  name: string;
  auditing_status: number;
  branch: TBranch;
  branch_id: number;
  create_date: number;
  description: string;
  index: number;
  managers: TUser[];
  number_of_players: number;
  update_date: number;
  course_fee: number;
  schedules: TSchedule[];
};

export type TEvent = {
  auditing_status: number;
  branch: TBranch;
  classes: TClass[];
  branch_id: number;
  class_ids: string;
  create_date: number;
  end_date_time: number;
  frequency_type: number;
  id: number;
  is_repeat: boolean;
  location: string;
  start_date_time: number;
  title: string;
  update_date: number;
};

export type TRedeem = {
  auditing_status: number;
  branch: TBranch;
  create_date: number;
  customer_info: TUser;
  id: number;
  issue_date: number;
  note: string;
  player_profile: TUser;
  point_used: number;
  product_id: number;
  product_image_path: string;
  product_name: string;
  redeem_status: number;
  update_date: number;
};

export type TOrder = {
  amount: number;
  auditing_status: number;
  create_date: number;
  customer_info: TUser;
  discount_value: number;
  id: number;
  note: string;
  order_status: number;
  order_time: number;
  payment_type: number;
  product_image_path: string;
  product_name: string;
  product_type: number;
  quantity: number;
  shipping_fee: number;
  transaction_amount: number;
  transaction_status: number;
  update_date: number;
};

export type TUploadFile = any;

export type TTimeOff = {
  at_date_time: number;
  auditing_status: number;
  branch: TBranch;
  id: number;
  player: TUser;
  reason: string;
};

export type TProduct = {
  product_id: number;
  product_name: string;
  selling_price: number;
};
