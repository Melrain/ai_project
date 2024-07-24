import LeftNavbar from '@/components/console/LeftNavbar';
import TopNavbar from '@/components/console/TopNavbar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex flex-row h-screen bg-slate-300 text-black'>
      <LeftNavbar />

      <div className='flex flex-col w-full'>
        <div className='p-4 fixed w-full bg-mycolor-200 shadow-lg border-b-2 border-b-black'>
          <TopNavbar />
        </div>
        <div className='flex-1 flex justify-center w-full  mt-14 max-sm:mt-20'>{children}</div>
      </div>
    </main>
  );
};

export default layout;
