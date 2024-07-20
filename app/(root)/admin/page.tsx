import AddProduct from '@/components/admin/AddProduct';
import AllUsers from '@/components/admin/AllUsers';
import DataCharts from '@/components/admin/DataCharts';
import { BarChartComp } from '@/components/charts/BarChartComp';
import { PieChartComp } from '@/components/charts/PieChartCompo';
import { getAllTransactions } from '@/lib/actions/transaction.action';
import { getUserByClerkId } from '@/lib/actions/user.action';
import { formatDateToMonthDay, groupByDay } from '@/lib/utils';
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

  return (
    <div className='flex justify-center w-full items-center gap-5 flex-col'>
      <div className=' '>{/* <h1>目前管理员：{admin.user.username} </h1> */}</div>
      {/* 管理员功能 */}

      <div className='mt-10'>
        <AddProduct />
      </div>
      <div className='w-full max-w-sm'>
        <DataCharts />
      </div>
      <div className='w-full flex justify-center items-center'>
        <AllUsers />
      </div>
    </div>
  );
};

export default page;
