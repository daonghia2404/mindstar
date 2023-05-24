import React, { useEffect, useState } from 'react';

import FormField from '@/components/FormField';
import Avatar from '@/components/Avatar';
import { REGEX } from '@/common/constants';
import Upload from '@/components/Upload/Upload';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { TUploadFile } from '@/common/models';

import { TUploadImageProps } from './UploadImage.types.d';
import './UploadImage.scss';

const UploadImage: React.FC<TUploadImageProps> = ({
  label,
  required,
  size,
  sizeImage = 70,
  shape = 'square',
  readOnlyText,
  value,
  useUploadAPI,
  disabled,
  onChange,
}) => {
  const [previewImage, setPreviewImage] = useState<string>();
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const handleUploadChange = (files: FileList | null): void => {
    if (files) {
      const file = Array.from(files)?.[0];
      setPreviewImage(URL.createObjectURL(file));
      setIsChanged(true);
      onChange?.(file);
    }
  };

  const handleUploadSuccess = (files: TUploadFile[]): void => {
    const file = files[0]?.url;
    setPreviewImage(file);
    setIsChanged(true);
    onChange?.(file as unknown as any);
  };

  useEffect(() => {
    if (!isChanged) {
      if (REGEX.url.test(value || '')) {
        setPreviewImage(value);
      } else if ((value as any)?.lastModified) {
        setPreviewImage(URL.createObjectURL(value as any));
      } else {
        setIsChanged(false);
        setPreviewImage('');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <FormField active label={label} required={required} size={size} readOnlyText={readOnlyText} className="UploadImage">
      <Upload
        useUploadAPI={useUploadAPI}
        accept=".jpg, .png, .jpeg"
        disabled={disabled}
        onChange={handleUploadChange}
        onUploadSuccess={handleUploadSuccess}
      >
        <div className="UploadImage-wrapper">
          <Avatar size={sizeImage} shape={shape} image={previewImage} />
          <div className="UploadImage-placeholder flex items-center justify-center">
            <Icon name={EIconName.Pencil} color={EIconColor.WHITE} />
          </div>
        </div>
      </Upload>
    </FormField>
  );
};

export default UploadImage;
