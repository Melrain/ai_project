import { SignIn } from '@clerk/nextjs';
import React from 'react';

const page = () => {
  return (
    <div className='w-full h-screen flex justify-center items-start'>
      <SignIn />
    </div>
  );
};

export default page;
