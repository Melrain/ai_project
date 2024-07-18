import RevenueCard from '@/components/revenue/RevenueCard';
import Spinner from '@/components/shared/Spinner';
import { getUserByClerkId } from '@/lib/actions/user.action';

import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
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
      <div className='w-full flex-col flex max-w-xs  bg-mycolor-200 rounded-[4px] p-3 gap-1 text-slate-400'>
        <div className='flex justify-start items-center w-full'>
          <Image
            src={'https://ipfs.filebase.io/ipfs/QmXi3t2k5Wbtt4M5ykvcAmFXwWzRjjVxxXVdPNfw8worKX'}
            width={40}
            height={40}
            alt='icon'
            className='rounded-full aspect-square border-2 border-green-500'
          />
        </div>
        <div className='flex justify-between w-full'>
          <span>{userResponse.user.username}</span>
          <span>余额:${userResponse.user.balance.toFixed(2)}</span>
        </div>
        <div className='flex justify-between w-full'>
          <span>VIP等级</span>
          <span>Lv:{userResponse.user.level}</span>
        </div>
        <div className='flex justify-between w-full'>
          <span>设备数量</span>
          <span>{userResponse.user.products.length}</span>
        </div>
      </div>
      <div className=' max-w-xl px-2 mt-5'>
        <RevenueCard userId={userId} />
      </div>
    </div>
  );
};

export default page;
