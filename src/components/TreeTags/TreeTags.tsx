import React from 'react';

import Tags from '@/components/Tags';

import { TTreeTagsProps } from './TreeTags.types.d';
import './TreeTags.scss';

const TreeTags: React.FC<TTreeTagsProps> = ({ options = [] }) => {
  return (
    <div className="TreeTags">
      {options.map((parent) => (
        <div key={parent.value} className="TreeTags-item">
          <div className="TreeTags-item-parent">
            <Tags options={[parent]} />
          </div>
          {parent.children.length > 0 && (
            <div className="TreeTags-item-children">
              <Tags options={parent.children} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TreeTags;
