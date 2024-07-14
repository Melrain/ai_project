import ProductSearchBar from '@/components/search/ProductSearchBar';
import ProductList from '@/components/shared/ProductList';
import React from 'react';

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

const page = ({ searchParams }: SearchParamsProps) => {
  console.log(searchParams);
  return (
    <div className='w-full flex flex-col  items-center p-5 h-screen'>
      {/* search */}
      <div className='w-full z-20'>
        <ProductSearchBar />
      </div>
      {/* product list */}
      <div className='flex flex-row justify-center max-w-xl xs:max-w-sm p-5 rounded-[2px] w-full gap-5 mt-5 '>
        <ProductList />
      </div>
    </div>
  );
};

export default page;
