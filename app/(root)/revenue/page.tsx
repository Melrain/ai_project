import RevenueCard from '@/components/revenue/RevenueCard';
import Spinner from '@/components/shared/Spinner';
import { getUserByClerkId } from '@/lib/actions/user.action';

import { auth } from '@clerk/nextjs/server';
import React from 'react';

const page = async () => {
  const { userId } = auth();
  if (!userId) {
    return <div>Not authorized</div>;
  }
  const userResponse = await getUserByClerkId(userId);
  if (!userResponse) {
    return <div>User not found</div>;
  }

  return (
    <div className='w-full flex justify-center flex-col items-center'>
      <div className='w-full flex max-w-xs bg-mycolor-300 rounded-[4px] p-3'>{userResponse.user.username}</div>
      <div className='w-full max-w-xl px-2 mt-5'>
        <RevenueCard userId={userId} />
      </div>
    </div>
  );
};

export default page;
