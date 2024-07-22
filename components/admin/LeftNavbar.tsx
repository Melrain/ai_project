'use client';
import Link from 'next/link';
import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { ArrowRightSquareIcon, CommandIcon, HardHatIcon, UserRound, X } from 'lucide-react';
import { IconChartSankey, IconDashboard } from '@tabler/icons-react';
import { Separator } from '../ui/separator';
import { usePathname } from 'next/navigation';

const LeftNavbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const lastSplit = pathname.split('/').pop();
  console.log(lastSplit);
  const links = [
    {
      name: '全局图表',
      href: '/admin',
      icon: <IconChartSankey className='text-green-500' />
    },
    {
      name: '管理员命令',
      href: '/admin/commands',
      icon: <CommandIcon className='text-green-500' />
    },
    {
      name: '管理用户',
      href: '/admin/users',
      icon: <UserRound className='text-green-500' />
    }
  ];

  return (
    <div className='  outline-none select-none focus:outline-none focus:select-none'>
      <div className='md:hidden flex  h-screen'>
        <Sheet open={isOpen}>
          <SheetTrigger
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className='outline-none select-none focus:outline-none focus:select-none '
          >
            <ArrowRightSquareIcon className='text-slate-500 ' />
          </SheetTrigger>
          <SheetContent
            side={'left'}
            className='w-1/3 bg-mycolor-200 outline-none border-0 focus:outline-none focus:bottom-0'
          >
            <SheetHeader>
              <SheetDescription className='flex  h-screen py-10 justify-start items-center flex-col'>
                <div className='flex flex-col gap-5'>
                  {links.map((link, index) => (
                    <Link
                      href={link.href}
                      className='flex w-full flex-row gap-2 justify-start items-center'
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      {link.icon}
                      <p>{link.name}</p>
                    </Link>
                  ))}
                </div>
                <X
                  className='absolute top-2 right-2'
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                />
                <div className='mt-20 gap-2 justify-start flex flex-row items-center'>
                  <HardHatIcon />
                  <p>管理员</p>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className='flex flex-col max-sm:hidden h-screen  bg-mycolor-200 px-4 justify-between py-20'>
        <div className='flex flex-col gap-10'>
          <h1 className='text-xl'>Admin</h1>
          {links.map((link, index) => (
            <div className='flex flex-col gap-2'>
              <Link href={link.href} className='flex w-full flex-row gap-2 justify-start items-center'>
                {link.icon}
                <p>{link.name}</p>
              </Link>
            </div>
          ))}
        </div>

        <div>
          <p>管理员</p>
        </div>
      </div>
    </div>
  );
};

export default LeftNavbar;
