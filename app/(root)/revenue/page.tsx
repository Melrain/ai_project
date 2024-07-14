import ProductCard from '@/components/revenue/ProductCard';

import { auth } from '@clerk/nextjs/server';
import React from 'react';

const page = async () => {
  const { userId } = auth();
  if (!userId) {
    return <div>Not authorized</div>;
  }

  return (
    <div>
      <div>
        <ProductCard userId={userId} />
      </div>
      <div>revenue card</div>
    </div>
  );
};

export default page;
