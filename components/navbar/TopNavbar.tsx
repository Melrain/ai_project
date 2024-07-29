'use client';
import { imageIndex } from '@/lib/imageIndex';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

import { Separator } from '../ui/separator';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { ModeToggle } from '../ModeToggle';

const TopNavbar = () => {
  return (
    <div className='flex justify-center '>
      <div className='flex flex-row py-4 w-full bg-black z-30    items-center justify-between px-10 max-lg:px-5  border-b-2 border-b-slate-900'>
        <Link href={'/'}>
          <div className='flex flex-row items-center gap-1'>
            <Image src={imageIndex.nvidia_icon.src} alt='logo' width={25} height={25} />
            <p className=' font-black'>
              NVIDIA AI <span className='text-green-500'>FARM</span>
            </p>
            <Separator orientation='vertical' className='h-5 w-[2px] mx-2 ' />
          </div>
        </Link>
        <div className='flex gap-4'>
          {/* <ModeToggle /> */}
          <UserButton />
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent className='w-[300px] sm:w-[540px]' side='left'></SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
