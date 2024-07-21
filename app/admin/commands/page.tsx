import AddProduct from '@/components/admin/AddProduct';
import React from 'react';

const page = () => {
  return (
    <div
      className='w-full max-w-xl  rounded-[8px]
    '
    >
      <div className='flex justify-center p-5 items-center  w-full'>
        <AddProduct />
      </div>
    </div>
  );
};

export default page;
