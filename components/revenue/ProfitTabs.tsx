'use client';

import { calculateProfit } from '@/lib/actions/functions';
import React, { useEffect } from 'react';
import Spinner from '../shared/Spinner';

interface ProfitTabsProps {
  userId: string;
  productId: string;
}
const ProfitTabs = ({ userId, productId }: ProfitTabsProps) => {
  const [profitAndTime, setProfitAndTime] = React.useState<any>(null);
  const [profitClient, setProfitClient] = React.useState(0);

  useEffect(() => {
    const fetchProfitAndTime = async () => {
      try {
        const response = await calculateProfit({ userId, productId });
        setProfitAndTime(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfitAndTime();
  }, [userId, productId]);

  useEffect(() => {
    //每三秒自动更新一次
    if (!profitAndTime) return;
    const updateProfit = (currentProfit: number, profitPerSec: number) => {
      setInterval(() => {
        currentProfit = Number(currentProfit) + Number(profitPerSec) * 3;
        setProfitClient(currentProfit);
      }, 3000);
    };

    updateProfit(profitAndTime.currentProfit, profitAndTime.profitPerSecond);
  }, [profitAndTime]);

  return (
    <div className='h-4 flex justify-center items-center text-green-500'>
      {profitClient ? (
        <span className='font-bold text-xl'>${profitClient.toFixed(4)}</span>
      ) : (
        <Spinner w={'4'} h={'4'} />
      )}
    </div>
  );
};

export default ProfitTabs;
