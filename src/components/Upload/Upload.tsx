import React, { useRef } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { TRootState } from '@/redux/reducers';

import { TUploadProps } from './Upload.types';
import './Upload.scss';

const Upload: React.FC<TUploadProps> = ({
  className,
  accept,
  multiple,
  children,
  disabled,
  useUploadAPI,
  addUrlPrefix = true,
  onChange,
  onUploadSuccess,
}) => {
  const dispatch = useDispatch();
  const inputFilesRef = useRef<HTMLInputElement>(null);

  const uploadFilesLoading = false;

  const disabledUpload = disabled || uploadFilesLoading;

  const handleClickUpload = (): void => {
    if (!disabledUpload) inputFilesRef?.current?.click();
  };

  const handleChangeUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;

    if (useUploadAPI) {
      const filesArray = Array.from(files || []);
      const formData = new FormData();
      filesArray.forEach((item) => formData.append('files', item));
      // dispatch(
      //   uploadFilesAction.request({ body: formData }, (response): void => {
      //     const data = response.map((item) => ({
      //       ...item,
      //       url: `${addUrlPrefix ? env.api.baseUrl.service : ''}${item.url}`,
      //     }));
      //     onUploadSuccess?.(data);
      //   }),
      // );
    } else {
      onChange?.(files);
    }

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
