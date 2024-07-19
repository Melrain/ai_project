import RevenueCard from '@/components/revenue/RevenueCard';
import UserCard from '@/components/revenue/UserCard';
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
      <div className='w-full max-w-xl px-2 mt-5 flex gap-5 flex-col justify-center items-center'>
        <div className='w-full flex justify-center items-center'>
          <UserCard
            username={userResponse.user.username}
            userBalance={userResponse.user.balance}
            userLevel={userResponse.user.level}
            userProductsLength={userResponse.user.products.length}
            userProfit={userResponse.user.totalProfit}
          />
        </div>
        <div>
          <RevenueCard userId={userId} mongoUserId={JSON.stringify(userResponse.user._id)} />
        </div>
      </div>
    </div>
  );
};

export default page;
