'use client';

import { Button } from '@/components/ui/button';
import { buyProduct, createProduct } from '@/lib/actions/product.action';

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

  const onBuyProduct = async () => {
    try {
      const result = await buyProduct({
        userClerkId: userId!,
        productId: '6682144fdae7aa721a44b6ed'
      });
      if (!result) {
        console.log('Error on buy Product');
      }
      if (result!.code !== 200) {
        console.log(result!.message);
      }
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button onClick={onClick}>Fetch User</Button>

      <Button onClick={onBuyProduct}>Buy Product</Button>
    </div>
  );
};

export default page;
