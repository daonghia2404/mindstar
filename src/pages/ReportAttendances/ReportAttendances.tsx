import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import moment, { Moment } from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@/components/Card';
import Select, { TSelectOption } from '@/components/Select';
import DatePicker from '@/components/DatePicker';
import { EEmpty, EFormat, EReportUnitFilter } from '@/common/enums';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { TGetReportAttendancesParams } from '@/services/api';
import { getReportAttendancesAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import ReportChart from '@/pages/ReportAttendances/ReportChart';
import { dataReportUnitTypeOptions } from '@/common/constants';

import { TReportAttendancesProps } from './ReportAttendances.types';
import './ReportAttendances.scss';

const ReportAttendances: React.FC<TReportAttendancesProps> = () => {
  const dispatch = useDispatch();

  const reportAttendancesState = useSelector(
    (state: TRootState) => state.reportReducer.getReportAttendancesResponse,
  )?.data;

  const [getReportParamsRequest, setGetReportParamsRequest] = useState<TGetReportAttendancesParams>({
    fromDate: moment().startOf('month')?.valueOf(),
    toDate: moment().endOf('month')?.valueOf(),
    filterUnit: dataReportUnitTypeOptions[0] as unknown as string,
  });

  const renderPickerType = (): 'date' | 'month' | 'year' | undefined => {
    switch ((getReportParamsRequest?.filterUnit as unknown as TSelectOption)?.value) {
      case EReportUnitFilter.DATE:
        return 'date';
      case EReportUnitFilter.MONTH:
        return 'month';
      case EReportUnitFilter.YEAR:
        return 'year';
      default:
        return undefined;
    }
  };

  const renderFormatType = (): string => {
    switch ((getReportParamsRequest?.filterUnit as unknown as TSelectOption)?.value) {
      case EReportUnitFilter.DATE:
        return EFormat['DD/MM/YYYY'];
      case EReportUnitFilter.MONTH:
        return EFormat['MM/YYYY'];
      case EReportUnitFilter.YEAR:
        return EFormat.YYYY;
      default:
        return '';
    }
  };

  const handleChangeUnitType = (data?: TSelectOption): void => {
    switch (data?.value) {
      case EReportUnitFilter.DATE:
        setGetReportParamsRequest({
          fromDate: moment().startOf('month')?.valueOf(),
          toDate: moment().endOf('month')?.valueOf(),
          filterUnit: data as unknown as string,
        });
        break;
      case EReportUnitFilter.MONTH:
      case EReportUnitFilter.YEAR:
        setGetReportParamsRequest({
          fromDate: moment().startOf('year')?.valueOf(),
          toDate: moment().endOf('year')?.valueOf(),
          filterUnit: data as unknown as string,
        });
        break;
      default:
        break;
    }
  };

  const getReport = useCallback(() => {
    dispatch(
      getReportAttendancesAction.request({
        params: {
          ...getReportParamsRequest,
          filterUnit: (getReportParamsRequest?.filterUnit as unknown as TSelectOption)?.data?.unit,
        },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getReportParamsRequest]);

  useEffect(() => {
    getReport();
  }, [getReport]);

  return (
    <div className="ReportAttendances">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="ReportAttendances-filter">
            <Row gutter={[16, 16]} justify="space-between">
              <Col />
              <Col>
                <Row gutter={[16, 16]}>
                  <Col>
                    <Select
                      value={getReportParamsRequest?.filterUnit as unknown as TSelectOption}
                      label="Đơn vị thời gian"
                      placeholder="Chọn dữ liệu"
                      options={dataReportUnitTypeOptions}
                      onChange={handleChangeUnitType}
                    />
                  </Col>
                  <Col>
                    <DatePicker
                      allowEmpty={[true, true]}
                      active
                      range
                      picker={renderPickerType()}
                      format={renderFormatType()}
                      style={{ minWidth: '18rem' }}
                      placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                      value={
                        getReportParamsRequest?.fromDate && getReportParamsRequest?.toDate
                          ? [moment(getReportParamsRequest?.fromDate), moment(getReportParamsRequest?.toDate)]
                          : undefined
                      }
                      label="Khoảng thời gian"
                      onChange={(data: Moment[]): void => {
                        setGetReportParamsRequest({
                          ...getReportParamsRequest,
                          fromDate: data?.[0]?.clone()?.startOf('day')?.valueOf(),
                          toDate: data?.[1]?.clone()?.endOf('day')?.valueOf(),
                        });
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="ReportAttendances-chart">
            <div className="ReportAttendances-chart-header">
              <Row gutter={[16, 16]} justify="space-between" align="middle">
                <Col>
                  <Row gutter={[16, 16]}>
                    <Col>
                      <div className="ReportAttendances-chart-header-item">
                        <Icon name={EIconName.UserCheck} color={EIconColor.TUNDORA} />
                        Có Mặt:{' '}
                        <strong>
                          {reportAttendancesState?.presents || EEmpty.ZERO} (
                          {reportAttendancesState?.percent_presents || EEmpty.ZERO}%)
                        </strong>
                      </div>
                    </Col>
                    <Col>
                      <div className="ReportAttendances-chart-header-item">
                        <Icon name={EIconName.UserX} color={EIconColor.TUNDORA} />
                        Vắng Mặt:{' '}
                        <strong>
                          {reportAttendancesState?.absents || EEmpty.ZERO} (
                          {reportAttendancesState?.percent_absents || EEmpty.ZERO}%)
                        </strong>
                      </div>
                    </Col>
                    <Col>
                      <div className="ReportAttendances-chart-header-item">
                        <Icon name={EIconName.UsersGroup} color={EIconColor.TUNDORA} />
                        Tổng Học Viên: <strong>{reportAttendancesState?.total_players || EEmpty.ZERO}</strong>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>

            <div className="ReportAttendances-chart-body">
              <ReportChart data={reportAttendancesState?.attendance_report_detail_list || []} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReportAttendances;
