import LeftNavbar from '@/components/admin/LeftNavbar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='relative overflow-hidden w-full h-screen'>
      <div className='  h-screen absolute'>
        <LeftNavbar />
      </div>
      <div className='mt-20 flex justify-center'>{children}</div>
    </main>
  );
};

export default layout;
