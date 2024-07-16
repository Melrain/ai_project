'use client';

import { calculateProfit } from '@/lib/actions/functions';
import React, { useEffect } from 'react';

interface ProfitTabsProps {
  userId: string;
  productId: string;
}
const ProfitTabs = ({ userId, productId }: ProfitTabsProps) => {
  const [profitAndTime, setProfitAndTime] = React.useState<any>(null);

  useEffect(() => {
    const fetchProfitAndTime = async () => {
      try {
        const response = await calculateProfit({ userId, productId });
        setProfitAndTime(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(fetchProfitAndTime, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [userId, productId]);

  return <div>{profitAndTime ? profitAndTime.currentProfit : ''}</div>;
};

export default ProfitTabs;
