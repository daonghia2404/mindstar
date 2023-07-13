import { TClass } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetReportAttendancesParams = {
  filterUnit?: string;
  fromDate?: number;
  toDate?: number;
};

export type TGetReportAttendancesMaterials = {
  params?: TGetReportAttendancesParams;
};

export type TAttendanceReportDetail = {
  at_date: number;
  at_month: number;
  at_year: number;
  class_attendance_list: {
    absent: number;
    class_id: number;
    present: number;
    class_name: string;
  }[];
};

export type TGetReportAttendancesResponse = TCommonResponse & {
  data: {
    attendance_report_detail_list: TAttendanceReportDetail[];
    classes: TClass[];
    absents: number;
    percent_absents: number;
    percent_presents: number;
    presents: number;
    total_elements: number;
    total_players: number;
  };
};

// FUNCTION

export const getReportAttendances = async ({
  params,
}: TGetReportAttendancesMaterials): Promise<TGetReportAttendancesResponse> => {
  const response = await ApiService.get(`/v1/api/attendances/${params?.filterUnit}`, { params });
  return response.data;
};
