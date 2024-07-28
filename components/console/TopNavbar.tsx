'use client';
import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger
} from '@/components/ui/menubar';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { usePathname, useRouter } from 'next/navigation';

import { Cog, Home, Menu, MenuSquareIcon, X } from 'lucide-react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { items } from './LeftNavbar';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

const TopNavbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const pathArray = pathname.split('/').filter((item) => item);
  const translateName = (name: string) => {
    switch (name) {
      case 'console':
        return '控制台';
      case 'envelope':
        return '红包管理';
      case 'claimList':
        return '领取记录';
      case 'userInfo':
        return '会员信息';
      case 'bankInfo':
        return '银行信息';
      case 'withdraw':
        return '提现订单';
      case 'orders':
        return '所有订单';
      case 'topup':
        return '充值订单';
      case 'leveling':
        return '升级订单';
      case 'rewards':
        return '推荐奖励订单';
      default:
        return name;
    }
  };
  return (
    <div className=''>
      <Breadcrumb className='max-sm:hidden'>
        <BreadcrumbList className=''>
          当前位置:
          {pathArray.map((item, index) => {
            return (
              <div key={index} className='flex flex-row items-center'>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${pathArray.slice(0, index + 1).join('/')}`}>
                    {translateName(item)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < pathArray.length - 1 && <BreadcrumbSeparator />}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      {/* sheet */}
      <div className='sm:hidden w-full justify-between flex'>
        <Sheet open={isOpen}>
          <UserButton />
          <SheetTrigger
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <MenuSquareIcon className='text-white' />
          </SheetTrigger>
          <SheetContent>
            <div
              className='absolute top-2 right-2 text-white'
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <X />
            </div>
            <SheetHeader>
              <SheetTitle>导航栏</SheetTitle>
              <SheetDescription>
                <Menubar className=' flex border-0 mt-5 flex-col items-center gap-5 text-sm text-white'>
                  <Link
                    href={'/console'}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className=' flex flex-row gap-2'
                  >
                    <Home /> 控制台
                  </Link>
                  {items.map((item, index) => (
                    <MenubarMenu key={index}>
                      <MenubarTrigger className='flex flex-row gap-2'>
                        <span>{item.icon}</span> <span className=' text-nowrap'>{item.name}</span>&gt;
                      </MenubarTrigger>
                      <MenubarContent className='bg-mycolor-100 rounded[4px]'>
                        {item.menu.map((subItem, subIndex) => (
                          <MenubarItem
                            className='flex justify-center'
                            key={subIndex}
                            onClick={() => {
                              setIsOpen(false);
                              router.push(subItem.link);
                            }}
                          >
                            {subItem.name}
                          </MenubarItem>
                        ))}
                      </MenubarContent>
                    </MenubarMenu>
                  ))}
                </Menubar>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default TopNavbar;
