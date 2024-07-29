import TopNavbar from '@/components/navbar/TopNavbar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='relative  bg-gradient-to-br z-20 from-black via-slate-950 to-indigo-950 h-screen '>
      <div className='fixed top-0 w-full z-50'>
        <TopNavbar />
      </div>
      <div className='mt-20 flex justify-center '>{children}</div>
      {/* <BottomNavbar /> */}
    </main>
  );
};

export default layout;
