import LitUpBorderButton from '@/components/buttons/LitUpBorderButton';
import { Input } from '@/components/ui/input';
import WithdrawForm from '@/components/withdraw/WithdrawForm';
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
    <div className='flex justify-center'>
      <div className='w-full flex flex-col'>
        <WithdrawForm userId={result.user._id} clerkId={userId} />
      </div>
    </div>
  );
};

export default page;
