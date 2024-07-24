'use client';
import { UserButton, useUser } from '@clerk/nextjs';
import { IconMoneybag } from '@tabler/icons-react';
import { Check, Circle, Cog, Command, Computer, ListOrdered, User } from 'lucide-react';
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LeftNavbar = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const rewardLinks = [
    {
      name: '红包管理',
      link: '/console/envelope'
    },
    {
      name: '领取记录',
      link: '/console/claimList'
    }
  ];
  const userLinks = [
    {
      name: '会员信息',
      link: '/console/userInfo'
    },
    {
      name: '银行信息',
      link: '/console/bankInfo'
    }
  ];
  const orderLinks = [
    {
      name: '提现订单',
      link: '/console/withdraw'
    },
    {
      name: '所有订单',
      link: '/console/orders'
    },
    {
      name: '充值订单',
      link: '/console/topup'
    },
    {
      name: '升级订单',
      link: '/console/leveling'
    },
    {
      name: '推荐奖励订单',
      link: '/console/rewards'
    }
  ];

  const links = [
    {
      name: (
        <Link href={'/console'} className='flex flex-row gap-2 w-full'>
          <Command /> <p>控制台</p>
        </Link>
      )
    },
    {
      name: (
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1' className='w-full'>
            <AccordionTrigger className='flex flex-row justify-between w-full gap-1 items-center'>
              <ListOrdered />
              <p>订单管理</p>
            </AccordionTrigger>
            <AccordionContent className='flex  justify-center items-start p-4 text-slate-400  bg-mycolor-200  gap-3 w-full flex-col'>
              {orderLinks.map((link, index) => (
                <Link key={link.link} href={link.link} className='flex flex-row gap-1 w-full cursor-pointer'>
                  <div className='border-2 border-slate-500 flex justify-center items-center size-4'>
                    {pathname == link.link ? <Check className='text-green-500' /> : null}
                  </div>
                  {link.name}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    },
    {
      name: (
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1' className='w-full'>
            <AccordionTrigger className='flex flex-row justify-between w-full gap-1 items-center'>
              <User />
              <p>会员管理</p>
            </AccordionTrigger>
            <AccordionContent className='flex  justify-center items-start p-4 text-slate-400  bg-mycolor-200  gap-3 w-full flex-col'>
              {userLinks.map((link, index) => (
                <Link
                  key={link.link}
                  href={link.link}
                  className='flex flex-row items-center gap-1 w-full cursor-pointer'
                >
                  <div className='border-2 border-slate-500 flex justify-center items-center size-4'>
                    {pathname == link.link ? <Check className='text-green-500' /> : null}
                  </div>
                  {link.name}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    },
    {
      name: (
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1' className='w-full'>
            <AccordionTrigger className='flex flex-row justify-between w-full gap-1 items-center'>
              <IconMoneybag className='size-[20px]' />
              <p>红包管理</p>
            </AccordionTrigger>
            <AccordionContent className='flex  justify-center items-start p-4 text-slate-400  bg-mycolor-200  gap-3 w-full flex-col'>
              {rewardLinks.map((link, index) => (
                <Link key={link.link} href={link.link} className='flex flex-row gap-1 w-full cursor-pointer'>
                  <div className='border-2 border-slate-500 flex justify-center items-center size-4'>
                    {pathname == link.link ? <Check className='text-green-500' /> : null}
                  </div>
                  {link.name}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    },
    {
      name: (
        <Link href={'/console/settings'} className='flex flex-row gap-2 justify-start items-center'>
          <Cog className='w-5' />
          <p>设置</p>
        </Link>
      )
    }
  ];
  return (
    <div className='flex px-2 flex-col shadow-lg py-4 border-r-2 border-black h-screen bg-gradient-to-tr max-w-[150px] w-full justify-start  items-center from-mycolor-200 gap-5 text-white to-mycolor-100 max-sm:hidden'>
      <div className='w-full'>
        <div className=' flex flex-row gap-2  items-center text-md text-slate-500'>
          <Computer />
          <p>管理员页面</p>
        </div>
      </div>
      <div className='flex flex-row gap-2 py-5 px-1 w-full justify-start'>
        <UserButton />
        <div className='flex flex-col gap-2 justify-start items-centers'>
          <p>{user?.username}</p>
          <div className='flex flex-row justify-start items-center gap-2'>
            {user?.username ? (
              <>
                <div className='bg-green-500 size-3 rounded-full' />
                <p>在线</p>
              </>
            ) : (
              <>
                <div className='bg-slate-500 size-3 rounded-full' />
                <p className='text-slate-500'>未登录</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        {links.map((link, index) => (
          <div key={index} className='flex flex-row  gap-2 py-2 px-2 w-full cursor-pointer'>
            <div className='flex flex-row justify-start items-center w-full'>{link.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftNavbar;
