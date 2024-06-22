import { SignUp } from '@clerk/nextjs';
import React from 'react';

const page = ({ params }: any) => {
  console.log('URL中的参数为:', params);
  return (
    <div className='w-full items-center justify-center'>
      <SignUp />
    </div>
  );
};

export default page;
