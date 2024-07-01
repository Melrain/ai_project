'use client';

import React from 'react';
import { PlaceholdersAndVanishInput } from '../ui/placeholders-and-vanish-input';

const AcInput = () => {
  const placeHolders = ['请输入产品名称', '请输入产品编号', '请输入产品类型'];
  return (
    <div>
      <PlaceholdersAndVanishInput placeholders={placeHolders} onChange={() => {}} onSubmit={() => {}} />
    </div>
  );
};

export default AcInput;
