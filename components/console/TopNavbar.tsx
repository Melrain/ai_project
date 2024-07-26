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

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { usePathname, useRouter } from 'next/navigation';

import { Cog, Home, Menu, MenuSquareIcon } from 'lucide-react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { items } from './LeftNavbar';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

const TopNavbar = () => {
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
      <ScrollArea>
        <div className='sm:hidden'>
          <Menubar className='bg-mycolor-200 text-sm text-white'>
            <div className='flex justify-center pr-2 items-center'>
              <UserButton />
            </div>
            <Link href={'/console'} className=''>
              <Home />
            </Link>
            {items.map((item, index) => (
              <MenubarMenu key={index}>
                <MenubarTrigger>
                  <span>{item.icon}</span> <span className='text-xs text-nowrap'>{item.name}</span>
                </MenubarTrigger>
                <MenubarContent className='bg-mycolor-100 rounded[4px]'>
                  {item.menu.map((subItem, subIndex) => (
                    <MenubarItem
                      key={subIndex}
                      onClick={() => {
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
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
};

export default TopNavbar;
