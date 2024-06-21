'use client';
import { imageIndex } from '@/lib/imageIndex';
import Image from 'next/image';
import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { ModeToggle } from '../ModeToggle';
import { Separator } from '../ui/separator';

const TopNavbar = () => {
  return (
    <div className=''>
      {/* 电脑端，ipad端 */}
      {/* <div className='flex flex-row py-4 items-center justify-between px-10 max-lg:px-5 max-sm:hidden'>
        <Image src={imageIndex.nvidia_icon.src} alt='logo' width={60} height={60} />

        <div>center</div>
      </div> */}
      {/* 手机端 */}
      <div className='flex flex-row py-2 items-center justify-between px-10 max-lg:px-5 '>
        <div className='flex flex-row items-center gap-1'>
          <Image src={imageIndex.nvidia_icon.src} alt='logo' width={25} height={25} />
          <p className=' font-black'>
            NVIDIA AI <span className='text-green-500'>FARM</span>
          </p>
          <Separator orientation='vertical' className='h-5 w-[2px] mx-2 ' />
        </div>
        <div className='flex gap-4'>
          {/* <ModeToggle /> */}

          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
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
    </div>
  );
};

export default TopNavbar;
