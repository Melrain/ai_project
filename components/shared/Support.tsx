'use client';
import { imageIndex } from '@/lib/imageIndex';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Support = () => {
  return (
    <div className='flex flex-row gap-5 w-full justify-center items-center'>
      <div className=''>
        <Link href={'https://wa.me/1132123'}>
          <Image src={imageIndex.whatsapp.src} alt='whatsapp' width={25} height={25} />
        </Link>
      </div>
      <div>
        <Link href={'https://t.me/taizi9999998'}>
          <Image src={imageIndex.telegram.src} alt='telegram' width={25} height={25} />
        </Link>
      </div>
    </div>
  );
};

export default Support;
