import React from 'react';

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

//TODO 添加产品前端页面，添加搜索功能

const page = ({ searchParams }: SearchParamsProps) => {
  console.log(searchParams);
  return (
    <div className=''>
      {/* head */}
      <div className='flex flex-row justify-center items-center'>
        <h1>ProductName</h1>
      </div>
    </div>
  );
};

export default page;
