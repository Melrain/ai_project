import LitUpBorderButton from '@/components/buttons/LitUpBorderButton';
import { Input } from '@/components/ui/input';
import WithdrawForm from '@/components/withdraw/withdrawForm';
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
      <div>
        <WithdrawForm />
      </div>
    </div>
  );
};

export default page;
