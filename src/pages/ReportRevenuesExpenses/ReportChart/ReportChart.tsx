import React from 'react';
import { Column } from '@ant-design/plots';
import moment from 'moment';

import { formatCurrency, formatISODateToDateTime } from '@/utils/functions';
import { EEmpty, EFormat } from '@/common/enums';
import { dataExpenseTypeOptions, dataTransactionTypeOptions } from '@/common/constants';

import { TReportChartProps } from './ReportChart.type';
import './ReportChart.scss';
import { TSelectOption } from '@/components/Select';

const ReportChart: React.FC<TReportChartProps> = React.memo(({ data }) => {
  const isUnitYear = Boolean(data?.[0]?.at_year && !data?.[0]?.at_month);
  const isUnitMonth = Boolean(data?.[0]?.at_month && data?.[0]?.at_month);

  const chartData =
    data
      ?.map((item) => {
        return (item.revenue_per_type_list || item.expense_per_category_list).map((subItem: any) => {
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
            name: `${subItem.type || subItem.category_name}`,
            date,
            value: subItem.amount,
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
        formatter: (value: string): string => {
          return formatCurrency({ amount: Number(value) || EEmpty.ZERO, showSuffix: true });
        },
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
      formatter: (record: any): string => {
        return Number(record?.value) > 0
          ? formatCurrency({ amount: Number(record?.value) || EEmpty.ZERO, showSuffix: true })
          : '';
      },
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
      formatter: (record: any) => {
        const name =
          [...dataTransactionTypeOptions, ...dataExpenseTypeOptions].find((item) => {
            const targetCompare = String((item as TSelectOption)?.data?.name || item.value);
            return targetCompare === record?.name;
          })?.label || EEmpty.DASH;
        const value = formatCurrency({ amount: Number(record?.value) || EEmpty.ZERO, showSuffix: true });

        return { name, value };
      },
    },
    legend: {
      position: 'top',
      background: {
        padding: 24,
        style: {
          opacity: 0,
        },
      },
      offsetY: -8,
      flipPage: false,
      itemName: {
        formatter: (value: string): string => {
          const name =
            [...dataTransactionTypeOptions, ...dataExpenseTypeOptions].find((item) => {
              const targetCompare = String((item as TSelectOption)?.data?.name || item.value);
              return targetCompare === value;
            })?.label || EEmpty.DASH;

          return name;
        },
      },
    },
  };

  return (
    <div className="ReportChart">
      <Column {...config} />
    </div>
  );
});

export default ReportChart;
