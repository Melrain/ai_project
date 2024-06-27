import { addSupervisor, getUserInfo } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

interface Props {
  params: {
    id: string;
  };
}
const page = async ({ params }: Props) => {
  console.log(params.id);

  const { userId } = auth();
  if (!userId) {
    redirect('/sign-up');
  }

  const userResult = await getUserInfo(params.id[0]);
  if (userResult === undefined) {
    return (
      <div className='flex items-center justify-center flex-col gap-5 '>
        <h1>Notice:</h1>
        <h1 className='px-10'>
          The invite code is invalid, please check with your inviter;Meanwhile you can still login as the customer
        </h1>
      </div>
    );
  }

  if (userResult.user.supervisor.username !== 'super admin') {
    return <div>you already have a supervisor, do you want to change one?</div>;
  }

  const result = await addSupervisor(userId, {
    clerkId: userId,
    username: params.id[0]
  });
  if (result === undefined) {
    return <div>Failed to add supervisor</div>;
  }
  console.log(result);
  return (
    <div>
      <h1>Supervisor added successfully</h1>
      <p>Supervisor: {result.user.supervisor.username}</p>
    </div>
  );
};

export default page;
