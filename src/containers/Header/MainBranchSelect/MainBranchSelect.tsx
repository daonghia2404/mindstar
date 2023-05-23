import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DropdownMenu from '@/components/DropdownMenu';
import Icon, { EIconName, EIconColor } from '@/components/Icon';
import { TGetBranchesParams } from '@/services/api';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { getCommonBranchesAction, uiActions } from '@/redux/actions';
import { EAuditingStatus } from '@/common/enums';
import { TBranch } from '@/common/models';
import { TRootState } from '@/redux/reducers';
import { getTotalPage } from '@/utils/functions';
import Helpers from '@/services/helpers';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';

import { TMainBranchSelectProps } from './MainBranchSelect.type';
import './MainBranchSelect.scss';

const MainBranchSelect: React.FC<TMainBranchSelectProps> = () => {
  const dispatch = useDispatch();
  const branchesState = useSelector((state: TRootState) => state.branchReducer.getCommonBranchesResponse)?.data;
  const currentBranch = useSelector((state: TRootState) => state.uiReducer.branch);
  const [visible, setVisible] = useState<boolean>(false);

  const [getBranchesParamsRequest, setGetBranchesParamsRequest] = useState<TGetBranchesParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    auditingStatuses: `${EAuditingStatus.ACTIVE}`,
  });
  const [branchOptions, setBranchOptions] = useState<TBranch[]>([]);

  const dataBranchDropdownMenu = [
    {
      value: '',
      active: !currentBranch?.id,
      label: 'Tất cả Chi nhánh',
      icon: EIconName.MapMarker,
      data: {
        id: '',
        name: 'Tất cả Chi nhánh',
      },
    },
    ...branchOptions.map((item) => ({
      value: String(item.id),
      active: currentBranch?.id === item.id,
      label: item.name,
      icon: EIconName.MapMarker,
      data: item,
    })),
  ];

  const handleLoadMore = (): void => {
    const isLoadMore =
      getBranchesParamsRequest.page < getTotalPage(branchesState?.total_elements || 0, getBranchesParamsRequest.size);

    if (isLoadMore) {
      setGetBranchesParamsRequest({
        ...getBranchesParamsRequest,
        page: getBranchesParamsRequest.page + 1,
      });
    }
  };

  const handleChangeBranch = (data: TDropdownMenuItem): void => {
    setVisible(false);
    dispatch(uiActions.setCommonBranch(data?.data));
    Helpers.setDataBranch(data?.data || {});
  };

  const getBranches = useCallback(() => {
    dispatch(
      getCommonBranchesAction.request({ params: getBranchesParamsRequest }, (response): void => {
        const isFirstFetching = getBranchesParamsRequest.page === DEFAULT_PAGE;
        const fetchingData = response.data.content;
        setBranchOptions(isFirstFetching ? fetchingData : [...branchOptions, ...fetchingData]);
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getBranchesParamsRequest]);

  useEffect(() => {
    const existedBranchData = Helpers.getDataBranch();
    dispatch(
      uiActions.setCommonBranch(
        existedBranchData?.id ? (existedBranchData as TBranch) : (dataBranchDropdownMenu[0]?.data as TBranch),
      ),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getBranches();
  }, [getBranches]);

  return (
    <div className="Header-branch">
      <DropdownMenu
        visible={visible}
        useVisible
        onVisibleChange={setVisible}
        options={dataBranchDropdownMenu}
        placement="bottomRight"
        getPopupContainer={(trigger): HTMLElement => trigger}
        maxHeight={256}
        onEnd={handleLoadMore}
        onClickMenuItem={handleChangeBranch}
      >
        <div className="Header-branch flex items-center">
          <div className="Header-branch-icon">
            <Icon name={EIconName.MapMarker} color={EIconColor.MINE_SHAFT} />
          </div>
          <div className="Header-branch-title nowrap">{currentBranch?.name}</div>
          <div className="Header-branch-arrow">
            <Icon name={EIconName.AngleDown} color={EIconColor.MINE_SHAFT} />
          </div>
        </div>
      </DropdownMenu>
    </div>
  );
};

export default MainBranchSelect;
