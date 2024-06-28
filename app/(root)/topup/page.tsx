import TopUpForm from '@/components/forms/TopUpForm';
import TransactionList from '@/components/shared/TransactionList';
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
    return <div className='flex justify-center'>Error! Please contact your supevisor, error code:1001</div>;
  }

  const user = result.user;

  if (!user) {
    return;
  }

  return (
    <div className='flex justify-center flex-col'>
      <div className='flex justify-center gap-5'>
        <h1>
          name: <span className='text-slate-500'>{user.username}</span>
        </h1>
      </div>
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
