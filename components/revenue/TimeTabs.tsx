'use client';

import { calculateProfit } from '@/lib/actions/functions';
import React, { useEffect } from 'react';

interface Props {
  userId: string;
  productId: string;
}

const TimeTabs = ({ userId, productId }: Props) => {
  const [timeStore, setTimeStore] = React.useState<{
    timeInSeconds: number;
    timeInMinutes: number;
    timeInHours: number;
    timeInDays: number;
  }>();
  const [convertedTime, setConvertedTime] = React.useState<{
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  }>();

  const convertSecondsToTime = (seconds: number) => {
    const d = new Date(0);
    d.setUTCSeconds(seconds);

    const year = d.getUTCFullYear() - 1970; // 减去1970年得到年份
    const month = d.getUTCMonth();
    const day = d.getUTCDate() - 1; // 减一得到日
    const hour = d.getUTCHours();
    const minute = d.getUTCMinutes();
    const second = d.getUTCSeconds();

    return { year, month, day, hour, minute, second };
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await calculateProfit({ userId, productId });
      if (!response) {
        return;
      }
      const timeInSeconds = response.timeDifferenceInSeconds;
      const timeInMinutes = response.timeDifferenceInMinutes;
      const timeInHours = response.timeDifferenceInHours;
      const timeInDays = timeInHours / 24;
      setTimeStore({ timeInSeconds, timeInMinutes, timeInHours, timeInDays });
    };
    fetchData();
  }, [userId, productId]);

  // 每秒添加一秒
  useEffect(() => {
    if (!timeStore) return;
    setInterval(() => {
      setConvertedTime(convertSecondsToTime((timeStore.timeInSeconds += 1)));
    }, 1000);
  }, [timeStore]);

  return (
    <div className='mt-2 text-slate-300 text-sm'>
      {convertedTime?.month !== 0 && <span>{convertedTime?.month}月</span>}
      {convertedTime?.day !== 0 && <span>{convertedTime?.day}天</span>}
      <span>{convertedTime?.hour}时</span>
      <span>{convertedTime?.minute}分</span>
      <span>{convertedTime?.second}</span>
    </div>
  );
};

export default TimeTabs;
