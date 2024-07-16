'use client';

import { useTimeStore } from '@/store/useTimeStore';
import React from 'react';

const TimeTabs = () => {
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

  return <div>TimeTabs</div>;
};

export default TimeTabs;
