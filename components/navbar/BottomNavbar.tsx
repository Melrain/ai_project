import { File, Share, UserCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { BsGpuCard, BsHouseDoorFill, BsRobot } from 'react-icons/bs';

const BottomNavbar = () => {
  const links = [
    {
      name: 'Products',
      link: '/products',
      icon: <BsRobot className='size-8 text-slate-400' />
    },
    {
      name: 'Share',
      link: '/share',
      icon: <Share className='size-8 text-slate-400' />
    },
    {
      name: 'Home',
      link: '/',
      icon: <BsHouseDoorFill className='size-8 text-slate-400' />
    },
    {
      name: 'My Farm',
      link: '/devices',
      icon: <BsGpuCard className='size-8 text-slate-400' />
    },
    {
      name: 'Me',
      link: '/profile',
      icon: <UserCircle className='size-8 text-slate-400' />
    }
  ];
  return (
    <div className='w-full z-20 fixed bottom-0 py-4 px-5 flex  justify-between bg-black  items-center'>
      {links.map((item, index) => (
        <div>
          <Link href={item.link} className='flex flex-col items-center justify-center gap-1'>
            <div>{item.icon}</div>
            <p>{item.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BottomNavbar;
