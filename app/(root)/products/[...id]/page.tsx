import SingleProduct from '@/components/products/SingleProduct';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    query: string;
  };
}
const page = async ({ params }: Props) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  console.log(params.id);
  return (
    <div className='flex justify-center flex-col w-full mt-5 items-center'>
      <SingleProduct productId={params.id} />
    </div>
  );
};

export default page;
