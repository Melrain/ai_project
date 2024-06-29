'use client';

import { getUserByClerkId } from '@/lib/actions/user.action';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TransactionList = () => {
  const [tx, setTx] = React.useState<{ createdAt: Date; amount: number; status: string; type: string }[]>([]);
  const { userId } = useAuth();
  const router = useRouter();
  if (!userId) {
    router.push('/sign-in');
  }

  useEffect(() => {
    const getUserInfo = async () => {
      const result = await getUserByClerkId(userId!);
      setTx(result?.user.topUpTransactions);
      console.log('tx', tx);
    };
    getUserInfo();
  }, []);
  return (
    <div>
      <h1>
        {tx.map((t) => (
          <div>
            <p>{t.amount}</p>
          </div>
        ))}
      </h1>
    </div>
  );
};

export default TransactionList;
