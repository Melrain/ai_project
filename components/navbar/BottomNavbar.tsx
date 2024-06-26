'use client';
import { iconIndex } from '@/lib/imageIndex';
import { Share, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { BsGpuCard, BsHouseDoorFill, BsRobot } from 'react-icons/bs';

const BottomNavbar = () => {
  const pathname = usePathname();

  const links = [
    {
      name: 'Products',
      link: '/products',
      icon: iconIndex.server.src
    },
    {
      name: 'Share',
      link: '/share',
      icon: iconIndex.share.src
    },
    {
      name: 'Home',
      link: '/',
      icon: iconIndex.house.src
    },
    {
      name: 'My Farm',
      link: '/myfarm',
      icon: iconIndex.gpu.src
    },
    {
      name: 'Me',
      link: '/profile',
      icon: iconIndex.user.src
    }
  ];
  return (
    <div className='w-full z-20 fixed bottom-0 py-4 px-5 flex  justify-between bg-black  items-center'>
      {links.map((item, index) => {
        const isActive = (pathname.includes(item.link) && item.link.length > 1) || pathname === item.link;

        return (
          <div key={index}>
            <Link href={item.link} className='flex flex-col items-center justify-center gap-1'>
              <Image src={item.icon} width={isActive ? 40 : 20} height={20} alt={item.name} />
              <p>{item.name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default BottomNavbar;
