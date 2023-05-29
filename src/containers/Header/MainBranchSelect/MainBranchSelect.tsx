import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DropdownMenu from '@/components/DropdownMenu';
import Icon, { EIconName, EIconColor } from '@/components/Icon';
import { getCommonBranchesAction, uiActions } from '@/redux/actions';
import { EAuditingStatus } from '@/common/enums';
import { TBranch } from '@/common/models';
import { TRootState } from '@/redux/reducers';
import Helpers from '@/services/helpers';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import { useOptionsPaginate } from '@/utils/hooks';

import { TMainBranchSelectProps } from './MainBranchSelect.type';
import './MainBranchSelect.scss';

const MainBranchSelect: React.FC<TMainBranchSelectProps> = () => {
  const dispatch = useDispatch();
  const currentBranch = useSelector((state: TRootState) => state.uiReducer.branch);
  const [visible, setVisible] = useState<boolean>(false);

  const { options: optionsBranches, handleLoadMore: handleLoadMoreBranches } = useOptionsPaginate(
    getCommonBranchesAction,
    'branchReducer',
    'getCommonBranchesResponse',
    undefined,
    {
      auditingStatuses: `${EAuditingStatus.ACTIVE}`,
    },
  );

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
    ...optionsBranches.map((item) => ({
      value: String(item.data.id),
      active: currentBranch?.id === item.data.id,
      label: item.data.name,
      icon: EIconName.MapMarker,
      data: item?.data,
    })),
  ];

  const handleChangeBranch = (data: TDropdownMenuItem): void => {
    setVisible(false);
    dispatch(uiActions.setCommonBranch(data?.data));
    Helpers.setDataBranch(data?.data || {});
  };

  useEffect(() => {
    const existedBranchData = Helpers.getDataBranch();
    dispatch(
      uiActions.setCommonBranch(
        existedBranchData?.id ? (existedBranchData as TBranch) : (dataBranchDropdownMenu[0]?.data as any),
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        onEnd={handleLoadMoreBranches}
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
