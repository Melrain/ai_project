import ProductSearchBar from '@/components/search/ProductSearchBar';
import ProductList from '@/components/shared/ProductList';
import Link from 'next/link';
import React from 'react';

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

//TODO 添加产品前端页面，添加搜索功能

const page = ({ searchParams }: SearchParamsProps) => {
  console.log(searchParams);
  return (
    <div className='w-full flex flex-col  items-center p-5 h-screen'>
      {/* head */}
      <div className='flex w-full justify-center'>
        <h1>ProductName</h1>
      </div>
      {/* search */}
      <div className='w-full  mt-5 '>
        <ProductSearchBar />
      </div>
      {/* product list */}
      <div className='flex flex-row justify-center max-w-xl p-5 rounded-[2px] w-full gap-5 mt-5 '>
        <ProductList filter={''} order={-1} />
      </div>
    </div>
  );
};

export default page;
