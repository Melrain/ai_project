import TopNavbar from '@/components/navbar/TopNavbar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='relative z-20 py-10 '>
      <div className='fixed top-0 w-full z-50'>
        <TopNavbar />
      </div>
      <div className='mt-20 flex justify-center '>{children}</div>
      {/* <BottomNavbar /> */}
    </main>
  );
};

export default layout;
