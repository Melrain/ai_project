import { Input } from '@/components/ui/input';
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
const page = ({ params }: Props) => {
  console.log(params.id);
  return <div className='flex justify-center flex-col items-center'></div>;
};

export default page;
