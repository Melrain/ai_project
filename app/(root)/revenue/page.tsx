import RevenueCard from '@/components/revenue/RevenueCard';

import { auth } from '@clerk/nextjs/server';
import React from 'react';

const page = async () => {
  const { userId } = auth();
  if (!userId) {
    return <div>Not authorized</div>;
  }

  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-full max-w-xl px-2'>
        <RevenueCard userId={userId} />
      </div>
    </div>
  );
};

export default page;
