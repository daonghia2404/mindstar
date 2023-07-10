import React from 'react';
import { Column } from '@ant-design/plots';
import moment from 'moment';

import { formatISODateToDateTime } from '@/utils/functions';
import { EFormat } from '@/common/enums';

import { TReportChartProps } from './ReportChart.type';
import './ReportChart.scss';

const ReportChart: React.FC<TReportChartProps> = React.memo(({ data }) => {
  const isUnitYear = Boolean(data?.[0]?.at_year && !data?.[0]?.at_month);
  const isUnitMonth = Boolean(data?.[0]?.at_month && data?.[0]?.at_month);

  const chartData =
    data
      ?.map((item) => {
        return item.class_attendance_list.map((subItem) => {
          const isYear = Boolean(item?.at_year && !item?.at_month);
          const isMonth = Boolean(item?.at_month && item?.at_month);
          let date;

          switch (true) {
            case isYear:
              date = moment({ year: item.at_year })?.valueOf();
              break;
            case isMonth:
              date = moment({ year: item.at_year, month: item.at_month - 1 })?.valueOf();
              break;
            default:
              date = item.at_date;
              break;
          }

          return {
            ...item,
            name: subItem.class_name,
            date,
            value: subItem.present,
          };
        });
      })
      ?.flat() || [];

  const config: any = {
    data: chartData,
    isGroup: true,
    xField: 'date',
    yField: 'value',
    seriesField: 'name',
    scrollbar: {
      type: 'horizontal',
    },
    minColumnWidth: 24,
    maxColumnWidth: 24,
    xAxis: {
      label: {
        autoRotate: false,
        formatter: (value: string): string => {
          switch (true) {
            case isUnitYear:
              return formatISODateToDateTime(Number(value), EFormat.YYYY);
            case isUnitMonth:
              return formatISODateToDateTime(Number(value), EFormat['MM/YYYY']);
            default:
              return formatISODateToDateTime(Number(value), EFormat['DD/MM/YYYY']);
          }
        },
      },
    },
    yAxis: {
      label: {
        // formatter: (value: string): string => {
        //   return formatCurrency({ amount: Number(value) || EEmpty.ZERO, showSuffix: true });
        // },
      },
    },
    label: {
      align: 'rail',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
    tooltip: {
      title: (value: string) => {
        switch (true) {
          case isUnitYear:
            return formatISODateToDateTime(Number(value), EFormat.YYYY);
          case isUnitMonth:
            return formatISODateToDateTime(Number(value), EFormat['MM/YYYY']);
          default:
            return formatISODateToDateTime(Number(value), EFormat['DD/MM/YYYY']);
        }
      },
    },
    legend: {
      position: 'top',
      background: {
        padding: [0, 24, 56, 24],
        style: {
          opacity: 0,
        },
      },
      offsetY: -8,
      flipPage: false,
    },
  };

  return (
    <div className="ReportChart">
      <Column {...config} />
    </div>
  );
});

export default ReportChart;
