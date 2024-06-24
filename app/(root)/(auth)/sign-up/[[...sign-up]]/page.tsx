import { SignUp } from '@clerk/nextjs';

import React from 'react';

const page = () => {
  return (
    <div className='w-full items-center h-screen flex justify-center'>
      <SignUp />
    </div>
  );
};

export default page;
