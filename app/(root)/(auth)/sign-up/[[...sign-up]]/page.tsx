import { SignUp } from '@clerk/nextjs';
import React from 'react';

const page = () => {
  return (
    <div className='w-full h-screen flex justify-center items-start'>
      <SignUp />
    </div>
  );
};

export default page;
