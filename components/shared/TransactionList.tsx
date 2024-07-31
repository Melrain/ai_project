'use client';

import { getUserTransactions } from '@/lib/actions/transaction.action';
import { getUserByClerkId } from '@/lib/actions/user.action';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { DataTable } from '../admin/table/data-table';

const TransactionList = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tx, setTx] = React.useState<{ createdAt: Date; amount: number; status: string; type: string }[]>([]);
  const { userId } = useAuth();

  const router = useRouter();
  if (!userId) {
    router.push('/sign-in');
  }

  const onFetchTransactions = async () => {
    try {
      setIsSubmitting(true);
      const userResult = await getUserByClerkId(userId!);
      if (!userResult) {
        throw new Error('Failed to get user');
      }

      const result = await getUserTransactions({ userId: userResult.user._id });
      setTx(result!.transactions);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const doAsync = async () => {
      try {
        const userResult = await getUserByClerkId(userId!);
        if (!userResult) {
          throw new Error('Failed to get user');
        }

        const result = await getUserTransactions({ userId: userResult.user._id });
        setTx(result!.transactions);
      } catch (error) {
        console.error(error);
      }
    };
    doAsync();
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
      <DataTable columns={[]} data={[]} placeholder={''} searchParams={''} mode={'dark'} />
    </div>
  );
};

export default TransactionList;
