import AddProduct from '@/components/admin/AddProduct';
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

  //fetch data
  const transactions = await getAllTransactions();
  const topUpTransactions = transactions.filter((transaction: any) => transaction.type === 'topup');

  const topUpData = topUpTransactions.map((transaction: any) => {
    return {
      month: formatDateToMonthDay(transaction.createdAt),
      desktop: transaction.amount,
      mobile: transaction.amount
    };
  });

  console.log(topUpData);

  return (
    <div className='flex justify-center w-full items-center  flex-col'>
      <div className=' '>{/* <h1>目前管理员：{admin.user.username} </h1> */}</div>
      {/* 管理员功能 */}

      <div className='mt-10'>
        <AddProduct />
      </div>
      <BarChartComp
        title={'注册与充值数据'}
        description={'----'}
        data={[]}
        topFooterDescription={'footerDescription'}
        bottomFooterDescription={'bottomFooterDescription'}
      />
      <PieChartComp />
    </div>
  );
};

export default page;
