import LitUpBorderButton from '@/components/buttons/LitUpBorderButton';
import { Input } from '@/components/ui/input';
import { getUserByClerkId } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
  }
  const result = await getUserByClerkId(userId);
  if (!result) {
    return <div>loading...</div>;
  }
  return (
    <div className='flex justify-center flex-col  items-center gap-5'>
      <h1>
        Balance:<span> {result.user.balance}</span>
      </h1>
      <Input placeholder='amount to withdraw' className='max-w-xs' />
      <LitUpBorderButton content={'withdraw'} icon={''} />
    </div>
  );
};

export default page;
