import { EReportUnitFilter } from './ReportRevenuesExpenses.enums';

export const dataReportUnitTypeOptions = [
  { value: EReportUnitFilter.DATE, label: 'Hàng ngày', data: { unit: 'report-by-day' } },
  { value: EReportUnitFilter.MONTH, label: 'Hàng tháng', data: { unit: 'report-by-month' } },
  { value: EReportUnitFilter.YEAR, label: 'Hàng năm', data: { unit: 'report-by-year' } },
];
