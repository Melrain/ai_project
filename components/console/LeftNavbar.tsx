'use client';
import { UserButton, useUser } from '@clerk/nextjs';
import { IconMoneybag } from '@tabler/icons-react';
import { Check, Circle, Cog, Command, Computer, ListOrdered, User } from 'lucide-react';
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsEnvelopeArrowDownFill } from 'react-icons/bs';

const LeftNavbar = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const items = [
    {
      name: '订单管理',
      menu: [
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
      ],
      icon: <ListOrdered />
    },
    {
      name: '会员管理',
      menu: [
        {
          name: '会员信息',
          link: '/console/userInfo'
        },
        {
          name: '银行信息',
          link: '/console/bankInfo'
        }
      ],
      icon: <User />
    },
    {
      name: '红包管理',
      menu: [
        {
          name: '红包管理',
          link: '/console/envelope'
        },
        {
          name: '领取记录',
          link: '/console/claimList'
        }
      ],
      icon: <BsEnvelopeArrowDownFill />
    }
  ];

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

      {/* Items */}
      <div className='flex flex-col gap-2 w-full'>
        {items.map((item, index) => (
          <Accordion type='single' collapsible>
            <AccordionItem value='item-1' className='w-full'>
              <AccordionTrigger className='flex flex-row justify-center gap-3 w-full  items-center'>
                <>{item.icon}</>
                <p>{item.name}</p>
              </AccordionTrigger>
              <AccordionContent className='flex  justify-center items-start p-4 text-slate-400  bg-mycolor-200  gap-3 w-full flex-col'>
                {item.menu.map((item, index) => (
                  <Link
                    key={item.link}
                    href={item.link}
                    className='flex flex-row gap-1  w-full cursor-pointer justify-start items-center'
                  >
                    <div
                      className={`size-3 rounded-full jus ${pathname === item.link ? 'bg-green-500' : 'border-slate-500 border-2'}`}
                    />
                    {item.name}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default LeftNavbar;
