import React, { useRef } from 'react';
import classNames from 'classnames';

import { TUploadProps } from './Upload.types';
import './Upload.scss';

const Upload: React.FC<TUploadProps> = ({ className, accept, multiple, children, disabled, onChange }) => {
  const inputFilesRef = useRef<HTMLInputElement>(null);

  const disabledUpload = disabled;

  const handleClickUpload = (): void => {
    if (!disabledUpload) inputFilesRef?.current?.click();
  };

  const handleChangeUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;
    onChange?.(files);

    if (inputFilesRef.current) inputFilesRef.current.value = '';
  };

  return (
    <div className={classNames('Upload', { disabled: disabledUpload }, className)}>
      <div className="Upload-wrapper" onClick={handleClickUpload}>
        {children}
      </div>
      <input
        ref={inputFilesRef}
        className="Upload-input"
        accept={accept}
        type="file"
        multiple={multiple}
        onChange={handleChangeUpload}
      />
    </div>
  );
};

export default Upload;
