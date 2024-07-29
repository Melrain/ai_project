import LeftNavbar from '@/components/console/LeftNavbar';
import TopNavbar from '@/components/console/TopNavbar';
import { getUserByClerkId } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  console.log(userId);
  if (!userId) {
    return;
  }
  const userRes = await getUserByClerkId(userId);
  if (!userRes) {
    return;
  }
  if (userRes.user.type !== 'super admin') {
    return (
      <div className='flex justify-center mt-10 text-xl font-bold px-10 text-wrap'>
        you are not super admin, you are {userRes.user.type},联系超级管理员给你改一个权限
      </div>
    );
  }

  return (
    <main className='flex flex-row h-screen bg-slate-300 text-black'>
      <LeftNavbar userType={userRes.user.type} />
      <div className='flex flex-col w-full h-screen sm:pl-[150px]'>
        <div className='p-4 z-50 fixed w-full bg-mycolor-200 shadow-lg border-b-2 border-b-black'>
          <TopNavbar />
        </div>
        <div className='flex-1 flex justify-center w-full  mt-20 max-sm:mt-20'>{children}</div>
      </div>
    </main>
  );
};

export default layout;
