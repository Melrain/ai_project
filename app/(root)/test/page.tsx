'use client';

import { Button } from '@/components/ui/button';
import { buyProduct } from '@/lib/actions/product';
import { getUserByClerkId } from '@/lib/actions/user.action';
import { useAuth } from '@clerk/nextjs';
import React from 'react';

const page = () => {
  const { userId } = useAuth();
  console.log(userId);
  const onClick = async () => {
    try {
      const result = await getUserByClerkId(userId!);
      console.log(result?.user);
    } catch (error) {
      console.error(error);
    }
  };
  const onCreateProduct = async () => {
    try {
      const user = await getUserByClerkId(userId!);
      const result = await buyProduct({
        productName: 'text-1',
        price: '100',
        picture: 'text-1',
        revenuePerDay: 100,
        userId: user?.user._id
      });
      if (!result) {
        throw new Error('Failed to create product');
      }
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Button onClick={onClick}>Fetch User</Button>
      <Button onClick={onCreateProduct}>Buy Product</Button>
    </div>
  );
};

export default page;
