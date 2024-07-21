import Link from 'next/link';
import React from 'react';

const LeftNavbar = () => {
  return (
    <div className=''>
      <div className='sm:hidden flex justify-center items-center h-screen'>展示navbar</div>
      <div className='flex flex-col max-sm:hidden h-screen bg-mycolor-200'>
        <div className='flex flex-row justify-between'>
          <p>logo</p>
          <p>其他</p>
        </div>
        <Link href='/admin'>Home</Link>
        <Link href='/admin/commands'>Commands</Link>
      </div>
    </div>
  );
};

export default LeftNavbar;
