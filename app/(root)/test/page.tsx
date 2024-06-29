'use client';

import { Button } from '@/components/ui/button';
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
  return (
    <div>
      <Button onClick={onClick}>Fetch User</Button>
    </div>
  );
};

export default page;
