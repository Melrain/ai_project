import React from 'react';

const RankingBoard = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center bg-[#121212] p-5 rounded-md'>
      <div className='w-full flex justify-between'>
        <h1 className='font-bold'>RankingBoard</h1>
        <div className='flex flex-row gap-2 text-xs justify-center items-center font-bold text-slate-300'>
          <p>TopUp</p>
          <p>Revenue</p>
          <p>Famous</p>
        </div>
      </div>
    </div>
  );
};

export default RankingBoard;
