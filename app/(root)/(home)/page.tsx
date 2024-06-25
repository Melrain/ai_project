import Billboard from '@/components/Billboard';
import HomeSections from '@/components/HomeSections';
import Notifications from '@/components/Notifications';
import Support from '@/components/shared/Support';
import { GlobeDemo } from '@/components/ui/github-globe';
import { Meteors } from '@/components/ui/meteors';
import News from '@/components/ui/News';
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
              className: 'text-xl text-white'
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
      {/* video */}
      <div className='mt-10 rounded-lg'>
        <video
          src='https://ipfs.filebase.io/ipfs/Qmamg5MUbUyCcLtnFcEHziXRxcCCDUYyRX4y7WMwTgm4Qy'
          width={320}
          height={240}
          controls
          preload='auto'
          loop={true}
          autoPlay
          muted
          playsInline
        />
      </div>
      <h1 className='mt-5'>Join us and meet the future</h1>
      <div className='mt-5'>
        <Notifications />
      </div>
      <div className='w-full mt-10'>
        <HomeSections />
      </div>
      <div className='mt-5'>
        <Billboard />
      </div>
      <div className='mt-5'>
        <News />
      </div>
      <GlobeDemo />
      <Meteors number={10} />
    </div>
  );
};

export default page;
