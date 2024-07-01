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
  return (
    <div className='flex justify-center flex-col items-center'>
      <div className='flex flex-row justify-between w-full px-5 max-w-xl'>
        <p>QR CODE</p>
        <h1>Title</h1>
        <p>Notifi</p>
      </div>
      <div className='mt-5 w-full px-5 max-w-xl py-2'>
        <Input className='rounded-[6px] border-2' />
      </div>
    </div>
  );
};

export default page;
