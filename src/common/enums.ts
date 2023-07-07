export enum EResponseCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTI_STATUS = 207,
  ALREADY_REPORTED = 208,
  I_AM_USED = 226,

  MULTIPLE_CHOICE = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  MISDIRECTED_REQUEST = 421,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  FAILED_DEPENDENCY = 424,
  TOO_EARLY = 425,
  UPGRADE_REQUIRED = 426,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,

  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  VARIANT_ALSO_NEGOTIATES = 506,
  INSUFFICIENT_STORAGE = 507,
  LOOP_DETECTED = 508,
  NOT_EXTENDED = 510,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}

export enum ETypeNotification {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

export enum ETimeoutDebounce {
  SEARCH = 300,
}

export enum EEmpty {
  DASH = '-',
  ZERO = 0,
}

export enum EFormat {
  'DD/MM/YYYY' = 'DD/MM/YYYY',
  'DD/MM/YYYY - HH:mm' = 'DD/MM/YYYY - HH:mm',
  'HH:mm:ss' = 'HH:mm:ss',
  'dddd, DD' = 'dddd, DD',
  'dddd' = 'dddd',
  'HH:mm' = 'HH:mm',
  'MM/YYYY' = 'MM/YYYY',
  'wo, YYYY' = 'wo, YYYY',
  'dddd | DD/MM/YYYY - HH:mm' = 'dddd | DD/MM/YYYY - HH:mm',
  'YYYY' = 'YYYY',
  'DD' = 'DD',
}

export enum EAuditingStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum ETransactionStatus {
  PAID = 1,
  PENDING = 2,
  FAILURE = 3,
  NEW = 4,
}

export enum EPaymentType {
  CASH = 1,
  BANK = 2,
  NINE_PAY = 3,
}

export enum EOrderStatus {
  PENDING = 1,
  CONFIRMED = 2,
  CANCELLED = 3,
  REFUNDED = 4,
  SHIPPER = 5,
  READY_FOR_DELIVERY = 6,
  COMPLETED = 7,
}

export enum EDegreeType {
  BEGINNER = 1,
  INTERMEDIATE = 2,
  ADVANCED = 3,
}

export enum ESalaryType {
  MONTHLY = 'monthly',
  SESSION = 'session',
}

export enum EUserType {
  PLAYER = 'player',
  TEACHER = 'teacher',
  MANAGER = 'manager',
  ADMIN = 'admin',
  USER = 'user',
}

export enum EDayOfWeek {
  MONDAY = '1',
  TUESDAY = '2',
  WEDNESDAY = '3',
  THURSDAY = '4',
  FRIDAY = '5',
  SATURDAY = '6',
  SUNDAY = '7',
}

export enum ETypeCheckIn {
  NONE = -1,
  PRESENT = 1,
  ABSENT = 0,
}

export enum ETypeCategory {
  EXPENSE = 1,
  PRODUCT = 2,
}

export enum ETypeProductUploadImages {
  REWARDS = 'rewards',
  PRODUCTS = 'products',
  ACADEMIES = 'academies',
}

export enum ETypeImageAcademy {
  LOGO = '1',
  QR_CODE = '2',
}

export enum ELevel {
  DIAMOND = 4,
  GOLD = 3,
  SILVER = 2,
  FRIENDLY = 1,
  COMMON = 0,
}

export enum ETransactionType {
  REGISTER_TO_JOIN_THE_CAR = 7,
  TOURNAMENT = 6,
  OTHER_SALES_AND_SERVICES = 5,
  GIFT_AND_CONTRIBUTIONS = 4,
  SPONSORSHIP = 3,
  MEMBERSHIP_FEE = 2,
  PRODUCT = 1,
}

export enum EExpenseType {
  REFUND_PRODUCT = 8,
  SUPPLIER = 7,
  ADVERTISEMENT = 6,
  OTHER = 5,
  TRANSPORT = 4,
  STADIUM = 3,
  SALARY = 2,
  REFUND_MEMBERSHIP_FEE = 1,
}

export enum EResetType {
  ATTENDANCE = 1,
  TRANSACTION_NUMBER_OF_UNITS = 2,
  TRANSACTION = 3,
  NOTIFICATION = 4,
}

export enum EPricingModelType {
  BASE_COURES = 1,
  MONTHLY = 2,
}

export enum EPointActionType {
  ATTENDANCES = 1,
  BIRTHDAY = 2,
  BUY_PRODUCT = 3,
  REFERRALS = 4,
}
