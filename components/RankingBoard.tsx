'use client';
import React from 'react';

const RankingBoard = () => {
  return (
    <div className='flex justify-center flex-col items-center w-full'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row items-end gap-4'>
          <div className='size-20 rounded-full border-2 border-green-500'></div>
          <div className='size-24 rounded-full border-2 border-yellow-500'></div>
          <div className='size-20 rounded-full border-2 border-blue-500'></div>
        </div>
        <div className='w-full rounded-[4px] opacity-80 text-center p-2 bg-gradient-to-t from-blue-500 via-yellow-500 to-green-500'>
          <p className='text-black font-bold shadow-md'>充值榜</p>
        </div>
      </div>
      <div>table</div>
    </div>
  );
};

export default RankingBoard;
