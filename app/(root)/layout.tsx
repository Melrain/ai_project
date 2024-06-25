import BottomNavbar from '@/components/navbar/BottomNavbar';
import TopNavbar from '@/components/navbar/TopNavbar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='relative overflow-hidden '>
      <TopNavbar />
      <div className='mt-20'>{children}</div>
      <BottomNavbar />
    </main>
  );
};

export default layout;
