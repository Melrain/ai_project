import { TypewriterEffectSmooth } from '@/components/ui/typewrite-effect';
import React from 'react';

const page = () => {
  return (
    <div className='flex justify-center flex-col items-center  dark:text-white'>
      <p className='mt-2 text-sm font-bold'>Welcome to Nvidia AI Farm</p>
      <TypewriterEffectSmooth
        words={[
          {
            text: 'Compute to',
            className: 'text-2xl'
          },
          {
            text: 'Earn',
            className: 'text-2xl text-green-500 dark:text-green-500'
          }
        ]}
      />
    </div>
  );
};

export default page;
