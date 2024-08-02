'use client';
import { imageIndex } from '@/lib/imageIndex';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Computer, HomeIcon, Menu, X } from 'lucide-react';

import { Separator } from '../ui/separator';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { IconBracketsContainEnd, IconCashRegister } from '@tabler/icons-react';

const TopNavbar = () => {
  const [open, setOpen] = useState(false);
  const topNavbarLinks = [
    { name: 'Home', href: '/', icon: <HomeIcon /> },
    {
      name: 'Products',
      href: '/products',
      icon: <Computer />
    },
    {
      name: 'withdraw',
      href: '/withdraw',
      icon: <IconCashRegister />
    },
    {
      name: 'topup',
      href: '/topup',
      icon: <IconCashRegister />
    },
    {
      name: '后台',
      href: '/console',
      icon: <IconBracketsContainEnd />
    }
  ];

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
          <Sheet open={open}>
            <SheetTrigger
              onClick={() => {
                setOpen(!open);
              }}
            >
              <Menu />
            </SheetTrigger>
            <div
              onClick={() => {
                setOpen(false);
              }}
            >
              <SheetContent className='flex flex-col w-auto' side='left'>
                <X
                  className='absolute top-2 right-2'
                  onClick={() => {
                    setOpen(false);
                  }}
                />
                <SheetTitle />
                <SheetDescription />
                {topNavbarLinks.map((link) => (
                  <SheetClose>
                    <Link
                      href={link.href}
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <div className='flex flex-row items-start w-full justify-start  gap-5 p-2'>
                        {link.icon}
                        <p>{link.name}</p>
                      </div>
                    </Link>
                  </SheetClose>
                ))}
              </SheetContent>
            </div>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
