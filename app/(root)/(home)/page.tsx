import Billboard from '@/components/Billboard';
import { ColorfulButton } from '@/components/buttons/ColorfulButton';
import HomeSections from '@/components/HomeSections';
import DialogShadcn from '@/components/shared/DialogShadcn';
import Support from '@/components/shared/Support';
import { Button } from '@/components/ui/button';
import { GlobeDemo } from '@/components/ui/github-globe';
import { Meteors } from '@/components/ui/meteors';
import News from '@/components/ui/News';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { TypewriterEffectSmooth } from '@/components/ui/typewrite-effect';
import { SignedOut, SignInButton } from '@clerk/nextjs';
import { Merriweather, Kalam } from 'next/font/google';
import Link from 'next/link';

import React from 'react';

const kalam = Kalam({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-kalam'
});

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
      <div className='mt-10 '>
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
      <div>
        <TextGenerateEffect
          words='Join us to meet the Future!'
          className={`${kalam.className} text-xl text-white flex justify-center items-center w-full`}
        />
      </div>
      {/* button */}
      <div className='mt-5'>
        <SignedOut>
          <Link href={'/sign-in'}>
            <ColorfulButton content='Sign-in' />
          </Link>
        </SignedOut>
      </div>
      {/* dialog */}
      <div className='absolute'>
        <DialogShadcn delayTime={5000} />
      </div>
      <div className='w-full mt-10  '>
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
