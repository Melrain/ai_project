import Support from '@/components/shared/support';
import { GlobeDemo } from '@/components/ui/github-globe';
import { Meteors } from '@/components/ui/meteors';
import { TypewriterEffectSmooth } from '@/components/ui/typewrite-effect';
import React from 'react';

const page = () => {
  return (
    <div className='flex justify-center flex-col items-center  dark:text-white '>
      <p className='mt-2 text-sm font-bold'>Welcome to Nvidia AI Farm</p>
      <div className='flex flex-col items-center justify-center'>
        <TypewriterEffectSmooth
          words={[
            {
              text: 'AI is the  ',
              className: 'text-xl'
            },

            {
              text: 'New Currency.',
              className: 'text-xl text-green-500 dark:text-green-500'
            }
          ]}
        />
      </div>
      <div className='flex w-full justify-center  items-center'>
        <Support />
      </div>
      <GlobeDemo />
      <Meteors number={10} />
    </div>
  );
};

export default page;
