import AddProduct from '@/components/console/AddProduct';
import React from 'react';
import { ZCOOL_QingKe_HuangYou } from 'next/font/google';
import { Database } from 'lucide-react';

const zcoolFont = ZCOOL_QingKe_HuangYou({
  weight: '400',
  subsets: ['latin']
});

const page = () => {
  return (
    <div className={`flex flex-col w-full h-screen`}>
      <div className='flex flex-row items-center px-2 '>
        <Database />
        <h1 className={`text-xl px-2 ${zcoolFont.className}`}>创建产品</h1>
      </div>
      <AddProduct />
    </div>
  );
};

export default page;
