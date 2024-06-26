import React from 'react';
import LitUpBorderButton from './buttons/LitUpBorderButton';
import { CircleDollarSignIcon } from 'lucide-react';
import Link from 'next/link';
import { Spotlight } from './ui/Spotlight';

const HomeSections = () => {
  const moneyIcon = <CircleDollarSignIcon className='text-green-500' />;
  return (
    <div className='w-full flex justify-center   items-center gap-5 flex-wrap'>
      <Spotlight className='-top-40 left-0 md:left-60 md:-top-20' fill='white' />
      <Link href={'/topup'} className='w-40 h-20 flex justify-center items-center'>
        <LitUpBorderButton content='Top-up' icon={moneyIcon} />
      </Link>
      <div className='w-40 h-20 flex justify-center items-center'>My Revenue</div>
      <div className='w-40 h-20 flex justify-center items-center'>Withdraw</div>
      <div className='w-40 h-20 flex justify-center items-center'>Team</div>
    </div>
  );
};

export default HomeSections;
