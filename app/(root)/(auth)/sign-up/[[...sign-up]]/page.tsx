import { SignUp } from '@clerk/nextjs';

import React from 'react';

const page = () => {
  return (
    <div className='w-full justify-center mt-10 h-screen flex '>
      <SignUp />
    </div>
  );
};

export default page;
