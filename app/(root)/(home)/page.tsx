import RankingBoard from '@/components/RankingBoard';
import { ColorfulButton } from '@/components/buttons/ColorfulButton';
import HomeSections from '@/components/HomeSections';
import DialogShadcn from '@/components/shared/DialogShadcn';
import Support from '@/components/shared/Support';
import { GlobeDemo } from '@/components/ui/github-globe';
import { Meteors } from '@/components/ui/meteors';
import News from '@/components/ui/News';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { TypewriterEffectSmooth } from '@/components/ui/typewrite-effect';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { Kalam } from 'next/font/google';
import Link from 'next/link';
import React from 'react';

const kalam = Kalam({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-kalam'
});

const page = async () => {
  return (
    <div className='flex justify-center flex-col w-full  max-w-3xl items-center  dark:text-white '>
      <p className='mt-2 font-extrabold text-lg '>Welcome to Nvidia AI Farm</p>

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

      {/* video */}
      <div className=' relative '>
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
          delayTime={0.2}
          words='Join us to meet the Future!'
          className={`${kalam.className} text-xl text-slate-300 flex justify-center items-center w-full`}
        />
        <div className='flex mt-2 w-full justify-center  items-center'>
          <Support />
        </div>
        <div className='mt-5 w-full flex items-center justify-center'>
          <Link href={'/products'}>
            <ColorfulButton content='查看所有商品' disabled={false} />
          </Link>
        </div>
      </div>

      {/* button */}
      <div className='mt-5'>
        <SignedOut>
          <Link href={'/sign-in'} className=''>
            <ColorfulButton content='登录' disabled={false} />
          </Link>
        </SignedOut>
        {/* <SignedIn>
          <Link href={'/myfarm'}>
            <ColorfulButton content='My Farm' disabled={false} />
          </Link>
        </SignedIn> */}
      </div>
      {/* dialog */}
      <SignedOut>
        <div className='absolute'>
          <DialogShadcn delayTime={3000} />
        </div>
      </SignedOut>

      {/* Topup Revenue Withdraw Team */}
      <div className='w-full mt-1'>
        <HomeSections />
      </div>

      <div className='mt-5'>
        <News />
      </div>
      <GlobeDemo />
      <div className='fixed top-0 left-1/2 w-full'>
        <Meteors number={10} />
      </div>
    </div>
  );
};

export default page;
