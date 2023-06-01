import React from 'react';
import { Col, Row } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import Upload from '@/components/Upload/Upload';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import FormField from '@/components/FormField';
import Avatar from '@/components/Avatar';
import { getFullUrlStatics } from '@/utils/functions';

import { TUploadImages, TUploadImagesProps } from './UploadImages.types.d';
import './UploadImages.scss';

const UploadImages: React.FC<TUploadImagesProps> = ({ value = [], disabled, label, required, size, onChange }) => {
  const LIMIT_IMAGES = 5;
  const showImages = value.filter((item) => !item.delete);

  const handleAddImage = (files: FileList | null): void => {
    if (files) {
      const filesArray = Array.from(files).slice(0, LIMIT_IMAGES - value.length);
      const parseFiles = filesArray.map((item, index) => ({
        value: uuidv4(),
        file: item,
        fileIndex: showImages.length + index,
      }));

      onChange?.([...value, ...parseFiles]);
    }
  };

  const handleChangeImage = (data: TUploadImages, files: FileList | null, fileIndex: number): void => {
    if (files) {
      const file = Array.from(files)?.[0];
      const parseFiles = value.map((item) => {
        if (item.value === data.value) {
          return {
            ...item,
            delete: true,
          };
        }

        return item;
      });
      onChange?.([...parseFiles, { value: uuidv4(), file, fileIndex }]);
    }
  };

  const handleRemoveImage = (data: TUploadImages): void => {
    if (data.url) {
      const parseFiles = value.map((item) => {
        if (item.value === data.value) {
          return {
            ...item,
            delete: true,
          };
        }

        return { ...item, fileIndex: item.fileIndex - 1 };
      });
      onChange?.(parseFiles);
    } else {
      const parseFiles = value
        .filter((item) => item.value !== data.value)
        ?.map((item, index) => ({ ...item, fileIndex: index }));
      onChange?.(parseFiles);
    }
  };

  return (
    <FormField label={label} active required={required} size={size} className="UploadImages">
      <div className="UploadImages-wrapper">
        <Row gutter={[4, 4]}>
          {value
            ?.filter((item) => !item.delete)
            ?.map((item, index) => (
              <Col key={item.value}>
                <Upload onChange={(dataUpload): void => handleChangeImage(item, dataUpload, index)} disabled={disabled}>
                  <div className="UploadImages-item">
                    <Avatar image={item.url ? getFullUrlStatics(item.url) : URL.createObjectURL(item.file)} />
                    <div
                      className="UploadImages-item-remove"
                      onClick={(e): void => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveImage(item);
                      }}
                    >
                      <Icon name={EIconName.Trash} color={EIconColor.WHITE} />
                    </div>
                  </div>
                </Upload>
              </Col>
            ))}
          {showImages.length < LIMIT_IMAGES && (
            <Col>
              <Upload onChange={handleAddImage} multiple disabled={disabled}>
                <div className="UploadImages-placeholder">
                  <Icon name={EIconName.Plus} color={EIconColor.SILVER_CHALICE} />
                </div>
              </Upload>
            </Col>
          )}
        </Row>
      </div>
    </FormField>
  );
};

export default UploadImages;
