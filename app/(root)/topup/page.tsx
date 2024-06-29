import TopUpForm from '@/components/forms/TopUpForm';
import TransactionList from '@/components/shared/TransactionList';

import React from 'react';

const page = async () => {
  return (
    <div className='flex justify-center flex-col'>
      <div className='flex justify-center gap-5'></div>
      <div className='flex justify-center mt-10'>
        <TopUpForm />
      </div>
      <div className='mt-5 flex justify-center items-center'>
        <TransactionList />
      </div>
    </div>
  );
};

export default page;
