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
    <div className='flex justify-center w-full items-center gap-5 flex-row flex-wrap'>
      <div className=''>管理页面主页</div>
    </div>
  );
};

export default page;
