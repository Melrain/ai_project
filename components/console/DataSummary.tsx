'use client';
import { useConsoleDataStore } from '@/store/consoleDataStore';
import React from 'react';

interface Props {
  allUsers: any[];
  allTransactions: any[];
}
const DataSummary = ({ allUsers, allTransactions }: Props) => {
  const setConsoleData = (allUsers: any[]) => {
    useConsoleDataStore.setState({ allUsers });
    useConsoleDataStore.setState({ allTransactions });
  };
  const allUserData = useConsoleDataStore((state: any) => state.allUsers);
  const allTransactionsData = useConsoleDataStore((state: any) => state.allTransactions);

  React.useEffect(() => {
    setConsoleData(allUsers);
  }, [allUsers]);

  console.log(allUserData);
  console.log(allTransactionsData);

  return (
    <div className='flex flex-col'>
      <div className='bg-slate-200 p-2 shadow-lg '>日期选择</div>
      <div className='p-2'>数据展示</div>
    </div>
  );
};

export default DataSummary;
