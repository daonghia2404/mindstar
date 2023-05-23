import React, { useState } from 'react';

import BranchSetup from '@/pages/RegisterBranch/BranchSetup';
import StepStar from '@/components/StepStar';
import FeeSetup from '@/pages/RegisterBranch/FeeSetup/FeeSetup';

import { dataStepStarRegisterBranch } from './RegisterBranch.data';
import { EKeyStepStarRegisterBranch } from './RegisterBranch.enums';
import './RegisterBranch.scss';

const RegisterBranch: React.FC = () => {
  const [stepState, setStepState] = useState({
    key: EKeyStepStarRegisterBranch.BRANCH_SETUP,
  });

  return (
    <div className="RegisterBranch">
      <div className="RegisterBranch-step">
        <StepStar
          value={dataStepStarRegisterBranch.find((option) => option.value === stepState.key)}
          options={dataStepStarRegisterBranch}
          onChange={(data): void => {
            setStepState({
              ...stepState,
              key: data?.value as EKeyStepStarRegisterBranch,
            });
          }}
        />
      </div>

      <div className="Auth-form">
        <div className="Auth-form-header">
          <div className="Auth-description" style={{ marginBottom: '1.2rem' }}>
            Trước khi bắt đầu, vui lòng hoàn thành...
          </div>
          <div className="Auth-title">
            {stepState?.key === EKeyStepStarRegisterBranch.BRANCH_SETUP && 'Thiết lập chi nhánh'}
            {stepState?.key === EKeyStepStarRegisterBranch.FEE_SETUP && 'Thiết lập học phí'}
          </div>
        </div>
        {stepState?.key === EKeyStepStarRegisterBranch.BRANCH_SETUP && (
          <BranchSetup
            onNext={(): void => {
              setStepState({
                ...stepState,
                key: EKeyStepStarRegisterBranch.FEE_SETUP,
              });
            }}
          />
        )}

        {stepState?.key === EKeyStepStarRegisterBranch.FEE_SETUP && <FeeSetup />}
      </div>
    </div>
  );
};

export default RegisterBranch;
