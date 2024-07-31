'use client';

import { getUserTransactions } from '@/lib/actions/transaction.action';
import { getUserByClerkId } from '@/lib/actions/user.action';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { DataTable } from '../admin/table/data-table';
import * as Realm from 'realm-web';
import { ColumnsTopup } from '../topup/Columns-topup';
import { columnsProduct } from '../admin/table/columns-product';
import { formatTime } from '@/lib/utils';

const TransactionList = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tx, setTx] = React.useState<{ createdAt: Date; amount: number; status: string; type: string }[]>([]);
  const { userId } = useAuth();
  const [topupTransactions, setTopupTransactions] = useState<any[]>([]);

  const app = new Realm.App({ id: process.env.NEXT_PUBLIC_MONGODB_APP_ID! });
  const router = useRouter();
  if (!userId) {
    router.push('/sign-in');
  }

  useEffect(() => {
    const doAsync = async () => {
      try {
        const userResult = await getUserByClerkId(userId!);
        if (!userResult) {
          throw new Error('Failed to get user');
        }

        const result = await getUserTransactions({ userId: userResult.user._id });
        if (!result) {
          throw new Error('Failed to get transactions');
        }
        setTopupTransactions(
          result.transactions.map((transaction: any) => ({
            ...transaction,
            amount: transaction.amount.toString(),
            createdAt: formatTime(transaction.createdAt)
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };
    doAsync();
  }, []);

  //realtime
  useEffect(() => {
    const login = async () => {
      await app.logIn(Realm.Credentials.anonymous());

      const result = await getUserByClerkId(userId!);

      if (!result) {
        throw new Error('Failed to get user');
      }

      if (result.user === null) {
        throw new Error('Failed to get user');
      }

      const mongodb = app.currentUser?.mongoClient('mongodb-atlas');
      const collection = mongodb?.db('NvidiaAI_DB').collection('users');
      if (!collection) return;

      for await (const change of collection.watch({ clerkId: userId })) {
        if (
          change.operationType === 'insert' ||
          change.operationType === 'update' ||
          change.operationType === 'replace'
        ) {
          const userResult = await getUserByClerkId(userId!);
          if (!userResult) {
            throw new Error('Failed to get user');
          }
          console.log(userResult.user.transactions);
          setTopupTransactions(
            userResult.user.transactions.map((transaction: any) => ({
              ...transaction,
              amount: transaction.amount.toString(),
              createdAt: formatTime(transaction.createdAt)
            }))
          );
        }
      }
    };
  }, []);

  function formatDateToMDHMS(isoString: string) {
    const date = new Date(isoString);
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hour = date.getUTCHours().toString().padStart(2, '0');
    const minute = date.getUTCMinutes().toString().padStart(2, '0');
    const second = date.getUTCSeconds().toString().padStart(2, '0');

    const formattedDate = `${month}/${day} ${hour}:${minute}:${second}`;
    return formattedDate;
  }

  const isoDateString = '2024-06-29T05:54:48.140Z';
  const formattedDate = formatDateToMDHMS(isoDateString);
  console.log(formattedDate); // 输出类似 "06/29 05:54:48" 的格式

  return (
    <div className='w-full'>
      <DataTable
        columns={ColumnsTopup}
        data={topupTransactions}
        placeholder={'按金额搜索...'}
        searchParams={'amount'}
        mode={'dark'}
      />
    </div>
  );
};

export default TransactionList;
