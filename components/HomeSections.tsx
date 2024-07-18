import React from 'react';
import LitUpBorderButton from './buttons/LitUpBorderButton';
import { CircleDollarSignIcon, Coins, CreditCard } from 'lucide-react';
import Link from 'next/link';

import ShimmerButton from './buttons/ShimmerButton';

import { BsPeopleFill } from 'react-icons/bs';
import TopGradientButton from './buttons/TopGradientButton';

const HomeSections = () => {
  const moneyIcon = <CircleDollarSignIcon className='text-green-500' />;
  return (
    <div className='w-full flex justify-center   items-center  flex-wrap'>
      <Link href={'/topup'} className='w-40 h-20 flex justify-center items-center'>
        <LitUpBorderButton content='Top-up' icon={moneyIcon} />
      </Link>
      <Link href={'/withdraw'} className='w-40 h-20 flex justify-center items-center'>
        <ShimmerButton content='Withdraw' textClassName='font-bold' icon={<CreditCard />} />
      </Link>
      <Link href={'/revenue'} className='w-40 h-20 flex justify-center items-center'>
        <TopGradientButton content='My Revenue' icon={<Coins className='text-yellow-400' />} />
      </Link>

      <Link href={'/team'} className='w-40 h-20 flex justify-center items-center gap-2'>
        <BsPeopleFill className='text-green-300 size-6' /> <p className='font-bold'>Team</p>
      </Link>
    </div>
  );
};

export default HomeSections;
