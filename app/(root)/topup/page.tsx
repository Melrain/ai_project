import TopUpForm from '@/components/forms/TopUpForm';
import RankingBoard from '@/components/RankingBoard';
import TransactionList from '@/components/shared/TransactionList';

import React from 'react';

const page = async () => {
  return (
    <div className='flex justify-center w-full px-5  max-w-3xl flex-col'>
      <div className='flex justify-center gap-5'>
        <h1>当前充值系统为测试状态，想充多少充多少，即时到账</h1>
      </div>
      <div className='flex justify-center mt-10'>
        <TopUpForm />
      </div>
      {/* RankingBoard */}
      <div className='mt-5 w-full bg-gradient-to-br shadow-sm shadow-white from-mycolor-200 via-mycolor-100 to-mycolor-200 rounded-[4px] p-5 '>
        <RankingBoard />
      </div>
      <div className='mt-5 flex justify-center items-center'>
        <TransactionList />
      </div>
    </div>
  );
};

export default page;
