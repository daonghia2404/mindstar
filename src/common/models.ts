export type TUser = {
  academy_id: number;
  address: string;
  auditing_status: number;
  avatar: string;
  user_id?: number;
  player_id?: number;
  branch: TBranch;
  branch_id: null;
  branch_name: string;
  class: TClass;
  device_list?: string[];
  city: TCity;
  level_id: number;
  total_spending?: number;
  level_name: string;
  schedules?: TSchedule[];
  class_schedules?: TSchedule[];
  city_id?: string;
  city_name?: string;
  date_of_birth: number;
  id: number;
  latest_login_at: number;
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
  players?: TUser[];
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
  attendance_settings: {
    is_multi_attendee_enable: boolean;
    is_own_setting_enable: boolean;
    is_time_off_setting_enable: boolean;
    max_own: number;
    max_time_off: number;
    max_unit_per_lesson: number;
  };
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
  transaction_settings: {
    fee_transaction_duration_in_days: number;
    fee_transaction_duration_in_units: number;
    fee_transaction_type_default: number;
    fee_transaction_value: number;
    fee_uniform_value: number;
    short_description_of_the_shuttle_bus_registration_fee: string;
    short_description_first_transaction_fee: string;
    short_description_first_uniform_fee: string;
  };
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
  branch_name?: string;
  schedules?: TSchedule[];
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
  branch: TBranch;
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
  academy_id: number;
  auditing_status: number;
  description: string;
  id: number;
  name: string;
  products_count: number;
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
  attributes: unknown;
  auditing_status: number;
  category: TCategory;
  category_id: number;
  code: string;
  create_date: number;
  description: string;
  discount: number;
  id: number;
  image: string;
  images: TImage[];
  name: string;
  popular: number;
  price: number;
  product_variant: unknown;
  retail_price: number;
  seller_info: unknown;
  update_date: number;
};

export type TEConnect = {
  account_name: string;
  address: string;
  auditing_status: number;
  avatar?: string;
  branch_id: number;
  city?: string;
  city_id: string;
  cover_image?: string;
  create_date: number;
  feeds: [];
  id: number;
  is_agree_promotion: number;
  mobile: string;
  name: string;
  registration_status: number;
  update_date: number;
  user_id: number;
};

export type TAttendance = {
  at_date: number;
  at_date_time: number;
  at_time: number;
  auditing_status: number;
  checked_in: number;
  class: TClass;
  class_id: number;
  course_id: number;
  create_date: number;
  description: string;
  duration_in_second: number;
  has_time_off_request: unknown;
  id: number;
  lesson_paid_status: number;
  player: TUser;
  player_id: number;
  time_off_list: unknown;
  unit_value: number;
  update_date: number;
  user_type: string;
  uuid: string;
};

export type TReward = {
  attributes: unknown;
  auditing_status: number;
  code: string;
  create_date: number;
  description: string;
  expired_date_time: number;
  id: number;
  image: string;
  images: TImage[];
  linked_product_id: string;
  name: string;
  point_value: number;
  product_variant: unknown;
  quantity_sold: number;
  remaining_days: number;
  seller_info: unknown;
  tier_point: number;
  update_date: number;
};

export type TImage = {
  file_index: number;
  image: string;
  product_id: number;
  product_variant_id: unknown;
  static_file_id: number;
};

export type TAcademy = {
  account_name: string;
  account_number: string;
  address: string;
  auditing_status: number;
  bank_name: string;
  branches: TBranch[];
  city: TCity;
  create_date: number;
  description: string;
  director: string;
  id: number;
  language: unknown;
  logo: string;
  name: string;
  personal_contact: TUser;
  primary_contact: string;
  qr_code: string;
  size: number;
  update_date: number;
};

export type TSupplier = {
  address: string;
  auditing_status: number;
  contact_name: string;
  contact_number: string;
  create_date: number;
  id: number;
  logo: string;
  name: string;
  note: string;
  tax_id: unknown;
  total_provided: number;
  update_date: number;
};
