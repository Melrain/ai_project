import LeftNavbar from '@/components/console/LeftNavbar';
import TopNavbar from '@/components/console/TopNavbar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex flex-row h-screen bg-white text-black'>
      <LeftNavbar />

      <div className='flex flex-col w-full'>
        <div className='p-4 bg-mycolor-200 shadow-lg'>
          <TopNavbar />
        </div>
        <div className='flex-1 flex justify-center w-full'>{children}</div>
      </div>
    </main>
  );
};

export default layout;
