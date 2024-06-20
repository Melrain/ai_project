'use client';
import { imageIndex } from '@/lib/imageIndex';
import Image from 'next/image';
import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const TopNavbar = () => {
  return (
    <div className=''>
      {/* 电脑端，ipad端 */}
      <div className='flex flex-row py-4 items-center justify-between px-10 max-lg:px-5 max-sm:hidden'>
        <Image src={imageIndex.nvidia_dark.src} alt='logo' width={140} height={140} />
        <div>center</div>
      </div>
      {/* 手机端 */}
      <div className='flex flex-row py-2 items-center justify-between px-10 max-lg:px-5 sm:hidden'>
        <Image src={imageIndex.nvidia_dark.src} alt='logo' width={100} height={100} />
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent className='w-[300px] sm:w-[540px]' side='left'>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our
                servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default TopNavbar;
