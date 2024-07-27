import AddProduct from '@/components/console/AddProduct';
import React from 'react';

const page = () => {
  return (
    <div className='flex flex-col w-full'>
      <h1 className='w-full p-2 bg-slate-200 text-center'>此处添加产品</h1>
      <AddProduct />
    </div>
  );
};

export default page;
