'use client';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

interface Props {
  delayTime: number;
}
const DialogShadcn = ({ delayTime }: Props) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delayTime);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <Dialog defaultOpen>
      <DialogTrigger></DialogTrigger>
      <DialogContent>
        <DialogHeader className='flex gap-2'>
          <DialogTitle>重要通知!</DialogTitle>
          <DialogDescription>目前处于测试状态。特朗普会当选总统。</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogShadcn;
