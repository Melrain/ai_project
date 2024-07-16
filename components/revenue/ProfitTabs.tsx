'use client';

import { calculateProfit } from '@/lib/actions/functions';
import React, { useEffect } from 'react';
import Spinner from '../shared/Spinner';
import { useTimeStore } from '@/store/useTimeStore';

interface ProfitTabsProps {
  userId: string;
  productId: string;
}
const ProfitTabs = ({ userId, productId }: ProfitTabsProps) => {
  const [profitAndTime, setProfitAndTime] = React.useState<any>(null);

  const setTimeStore = (time: number) => useTimeStore.setState({ time });

  useEffect(() => {
    const fetchProfitAndTime = async () => {
      try {
        const response = await calculateProfit({ userId, productId });
        setProfitAndTime(response);
        setTimeStore(profitAndTime.timeDifferenceInSeconds);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(fetchProfitAndTime, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [userId, productId]);

  return <div>{profitAndTime ? profitAndTime.currentProfit : <Spinner />}</div>;
};

export default ProfitTabs;
