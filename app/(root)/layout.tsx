import TopNavbar from '@/components/navbar/TopNavbar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='relative overflow-hidden'>
      <div className=''>
        <TopNavbar />
      </div>
      <div className='mt-20 flex justify-center'>{children}</div>
      {/* <BottomNavbar /> */}
    </main>
  );
};

export default layout;
