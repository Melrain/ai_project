'use client';
import React from 'react';
import { MedalImages } from '@/lib/imageIndex';
import Image from 'next/image';

const RankingBoard = () => {
  return (
    <div className='flex justify-center  flex-col items-center w-full'>
      <div className='flex flex-col gap-10'>
        <div className='flex flex-row items-end gap-4'>
          <div className='relative size-20 rounded-full border-2 flex justify-center border-slate-400'>
            <Image
              src={MedalImages.silver.src}
              width={20}
              height={20}
              className='absolute -bottom-4 z-20'
              alt={MedalImages.silver.name}
            />
          </div>
          <div className='size-24 relative justify-center flex rounded-full border-2 border-yellow-500'>
            <Image
              src={MedalImages.gold.src}
              width={20}
              height={20}
              alt={MedalImages.gold.name}
              className='absolute -bottom-4 z-20'
            />
          </div>
          <div className='size-20 relative rounded-full border-2 border-blue-500 flex justify-center'>
            <Image
              src={MedalImages.bronze.src}
              width={20}
              height={20}
              alt={MedalImages.bronze.name}
              className='absolute -bottom-4 z-20'
            />
          </div>
        </div>
        <div className='w-full rounded-[4px] shadow-md shadow-white  text-center p-2 bg-gradient from-indigo-900 via-mycolor-300 to-purple-900'>
          <p className='text-white font-bold '>充值榜</p>
        </div>
      </div>
    </div>
  );
};

export default RankingBoard;
