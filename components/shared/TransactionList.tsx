'use client';

import { useTranscationsStore } from '@/store/useTransactionsStore';
import React, { useEffect } from 'react';

const TransactionList = () => {
  const useTransactions = useTranscationsStore((state: any) => state.transactions);
  useEffect(() => {}, []);
  return <div></div>;
};

export default TransactionList;
