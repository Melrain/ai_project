import TopNavbar from '@/components/navbar/TopNavbar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='relative overflow-hidden '>
      <TopNavbar />
      <div className=''>{children}</div>
    </main>
  );
};

export default layout;
