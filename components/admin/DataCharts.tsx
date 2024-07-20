'use client';

import React, { useEffect } from 'react';
import { BarChartComp } from '../charts/BarChartComp';
import { getAllTransactions } from '@/lib/actions/transaction.action';
import { formatDateToMonthDay } from '@/lib/utils';

import { getAllUsers } from '@/lib/actions/user.action';

const DataCharts = () => {
  const [dataResult, setDataResult] = React.useState<{ date: string; topup: number }[]>([]);
  const [days, setDays] = React.useState<number>(3);
  const [totalTopup, setTotalTopup] = React.useState<number>(0);
  const [totalRegister, setTotalRegister] = React.useState<number>(0);

  const fakeData = [
    {
      date: '2024-07-20',
      topup: 1000
    },
    {
      date: '2024-07-21',
      topup: 2000
    },
    {
      date: '2024-07-22',
      topup: 3000
    },
    {
      date: '2024-07-23',
      topup: 4000
    },
    {
      date: '2024-07-24',
      topup: 5000
    },
    {
      date: '2024-07-25',
      topup: 6000
    },
    {
      date: '2024-07-26',
      topup: 7000
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const transactions = await getAllTransactions();
      const users = await getAllUsers();
      setTotalRegister(users.length);
      const totalTopup = transactions.reduce((acc: number, curr: any) => {
        if (curr.type === 'topup') {
          acc += curr.amount;
        }
        return acc;
      }, 0);
      setTotalTopup(totalTopup);
      console.log('totalTopup', totalTopup);

      const topUpTransactions = transactions.filter((transaction: { type: 'topup' }) => transaction.type === 'topup');

      const topUpData = topUpTransactions.map((transaction: { createdAt: string; amount: number }) => {
        return {
          date: formatDateToMonthDay(transaction.createdAt),
          topup: transaction.amount
        };
      });

      console.log('topUpDate', topUpData);

      const dataResult = topUpData.reduce(
        (acc: { date: string; topup: number }[], curr: { date: string; topup: number }) => {
          const existingItem = acc.find((item: { date: string }) => item.date === curr.date);

          if (existingItem) {
            existingItem.topup += curr.topup;
          } else {
            acc.push({ date: curr.date, topup: curr.topup });
          }

          return acc;
        },
        []
      );

      setDataResult(dataResult.length > days ? dataResult.slice(0, days) : dataResult);
    };
    fetchData();
  }, [days]);

  return (
    <div className='flex flex-col w-full'>
      <BarChartComp
        title={`近${days}日充值数据`}
        description={`截止到${dataResult.length > 0 ? dataResult[dataResult.length - 1].date : ''}`}
        data={fakeData}
        topFooterDescription={`总充值金额:$${totalTopup}`}
        bottomFooterDescription={`总注册人数: ${totalRegister}`}
      />
    </div>
  );
};

export default DataCharts;
