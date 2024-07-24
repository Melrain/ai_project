import DataSummary from '@/components/console/DataSummary';
import React from 'react';

const page = () => {
  return (
    <div className='w-full p-2'>
      <div className='flex p-2 rounded-[4px] flex-col bg-slate-200 shadow-lg w-full justify-start'>
        <p className='font-bold'>总数据展示</p>
        <p>该页面用于总数据展示, 可根据时间范围选择部分数据展示。</p>
      </div>
      <div className='w-full py-4 '>
        <DataSummary />
      </div>
    </div>
  );
};

export default page;
