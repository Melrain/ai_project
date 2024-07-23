import { UserButton } from '@clerk/nextjs';
import { IconMoneybag } from '@tabler/icons-react';
import { Circle, Cog, Command, ListOrdered, User } from 'lucide-react';
import React from 'react';
import { BsPeople } from 'react-icons/bs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const LeftNavbar = () => {
  const rewardLinks = [
    {
      name: '红包管理'
    },
    {
      name: '领取记录'
    }
  ];
  const userLinks = [
    {
      name: '会员信息'
    },
    {
      name: '银行信息'
    }
  ];
  const orderLinks = [
    {
      name: '提现订单'
    },
    {
      name: '所有订单'
    },
    {
      name: '充值订单'
    },
    {
      name: '升级订单'
    },
    {
      name: '推荐奖励订单'
    }
  ];

  const links = [
    {
      name: (
        <div className='flex flex-row gap-2 w-full'>
          <Command /> <p>控制台</p>
        </div>
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
                <div className='flex flex-row gap-1 w-full cursor-pointer'>
                  <Circle className='w-[20px]' />
                  {link.name}
                </div>
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
                <div className='flex flex-row gap-1 w-full cursor-pointer'>
                  <Circle className='w-[20px]' />
                  {link.name}
                </div>
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
                <div className='flex flex-row gap-1 w-full cursor-pointer'>
                  <Circle className='w-[20px]' />
                  {link.name}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    },
    {
      name: (
        <div className='flex flex-row gap-2 justify-center items-center'>
          <Cog />
          <p>设置</p>
        </div>
      )
    }
  ];
  return (
    <div className='flex px-5 flex-col h-screen bg-gradient-to-tr max-w-[200px] w-full  items-center from-mycolor-200 gap-5 text-white to-mycolor-100'>
      <div>
        <h1 className='text-xl text-slate-500'>网站后台</h1>
      </div>
      <div className='flex flex-row gap-2 justify-between px-1 items-center'>
        <UserButton />
        <div className='flex flex-col gap-2 justify-center items-centers'>
          <p>yyye</p>
          <div className='flex flex-row justify-center items-center gap-2'>
            <div className='bg-green-500 size-3 rounded-full' />
            <p>在线</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        {links.map((link, index) => (
          <div className='flex flex-row justify-center gap-2 py-4 px-2 w-full cursor-pointer'>
            <div className='flex flex-row justify-start items-center w-full'>{link.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftNavbar;
