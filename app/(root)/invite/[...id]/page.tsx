import { addSupervisor } from '@/lib/actions/user.action';
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
    redirect('/sign-in');
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
