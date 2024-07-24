'use client';
import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

const TopNavbar = () => {
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
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          当前位置:
          {pathArray.map((item, index) => {
            return (
              <>
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink href={`/${pathArray.slice(0, index + 1).join('/')}`}>
                    {translateName(item)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < pathArray.length - 1 && <BreadcrumbSeparator />}
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default TopNavbar;
