'use client';
import React from 'react';

const RankingBoard = () => {
  return (
    <div className='flex justify-center flex-col items-center w-full'>
      <div className='flex flex-row gap-4'>
        <div className='w-32 h-40 flex justify-center items-center bg-gradient-to-br from-purple-900 shadow-md shadow-purple-500 via-purple-500 to-indigo-800 rounded-[4px] transform skew-x-12'>
          1
        </div>
        <div className='w-20 h-40 bg-mycolor-300 justify-center flex items-center'>2</div>
        <div className='w-20 h-40 bg-mycolor-300 justify-center flex items-center transform -skew-x-12'>3</div>
      </div>
      <div>table</div>
    </div>
  );
};

export default RankingBoard;
