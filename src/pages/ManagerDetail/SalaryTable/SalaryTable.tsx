import React, { useState } from 'react';

import Table from '@/components/Table';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataPaymentTypeOptions } from '@/common/constants';
import { EEmpty } from '@/common/enums';
import { formatCurrency } from '@/utils/functions';
import { TGetManagerAttendancesParams } from '@/services/api';
import { EIconColor } from '@/components/Icon';

import { TSalaryTableProps } from './SalaryTable.types';
import './SalaryTable.scss';

const SalaryTable: React.FC<TSalaryTableProps> = () => {
  // const { id } = useParams();
  // const dispatch = useDispatch();
  // const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  // const getManagerAttendancesLoading = useSelector(
  //   (state: TRootState) => state.loadingReducer[EGetManagerAttendancesAction.GET_MANAGER_ATTENDANCES],
  // );
  // const attendancesState = useSelector(
  //   (state: TRootState) => state.attendanceReducer.getManagerAttendancesResponse,
  // )?.data;

  const [getManagerAttendancesParamsRequest, setGetManagerAttendancesParamsRequest] =
    useState<TGetManagerAttendancesParams>({
      page: DEFAULT_PAGE,
      size: DEFAULT_PAGE_SIZE,
    });

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetManagerAttendancesParamsRequest({
      ...getManagerAttendancesParamsRequest,
      page,
      size,
      sort,
    });
  };

  const columns = [
    {
      key: 'status',
      dataIndex: 'status',
      title: '',
      render: (): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">Lương tháng 5/2023</div>
            <div className="Table-info-description">Thứ 7 - 10/06/2023 - 19:00</div>
          </div>
        );
      },
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      title: '',
      className: 'nowrap',
      render: (_: string, record: any): React.ReactElement => {
        return (
          <div className="Table-info text-right">
            <div className="Table-info-title" style={{ color: EIconColor.APPLE }}>
              + {formatCurrency({ amount: record.amount || EEmpty.ZERO, showSuffix: true })}
            </div>
            <div className="Table-info-description">
              {dataPaymentTypeOptions.find((item) => item.value === record?.payment_type)?.label || EEmpty.DASH}
            </div>
          </div>
        );
      },
    },
  ];

  // const getManagerAttendances = useCallback(() => {
  //   dispatch(
  //     getManagerAttendancesAction.request({
  //       paths: { id },
  //       params: getManagerAttendancesParamsRequest,
  //       headers: { branchIds: currentBranchId },
  //     }),
  //   );
  // }, [dispatch, getManagerAttendancesParamsRequest, id, currentBranchId]);

  // useEffect(() => {
  //   getManagerAttendances();
  // }, [getManagerAttendances]);

  return (
    <div className="SalaryTable">
      <Table
        useCardResponsive={false}
        columns={columns}
        dataSources={[1, 2, 3, 4, 5]}
        page={getManagerAttendancesParamsRequest?.page}
        pageSize={getManagerAttendancesParamsRequest?.size}
        // total={attendancesState?.total_elements}
        // loading={getManagerAttendancesLoading}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
};

export default SalaryTable;
