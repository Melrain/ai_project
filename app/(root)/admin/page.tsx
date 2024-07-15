import AddProduct from '@/components/admin/AddProduct';
import { getUserByClerkId } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
  }
  // if (process.env.NEXT_ADMINS === undefined) {
  //   return <div>Admins not set</div>;
  // }
  // const admins = process.env.NEXT_ADMINS.split(',');
  // console.log(admins);
  // if (!admins.includes(userId)) {
  //   return <div>You are not the Admin </div>;
  // }

  const admin = await getUserByClerkId(userId);
  if (!admin) {
    return <div>Admin not found</div>;
  }
  console.log(admin.user.products);

  return (
    <div className='flex justify-center w-full items-center  flex-col'>
      <div className=' '>{/* <h1>目前管理员：{admin.user.username} </h1> */}</div>
      {/* 管理员功能 */}

      <div className='mt-10'>
        <AddProduct />
      </div>
    </div>
  );
};

export default page;
