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
  console.log(userId);
  return (
    <div>
      {userId}:{params.id}
    </div>
  );
};

export default page;
