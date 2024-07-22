import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex flex-row h-screen bg-white text-black'>
      <div className='p-5'>控制台菜单</div>
      <div className='flex-1 flex justify-center w-full p-5'>{children}</div>
    </main>
  );
};

export default layout;
