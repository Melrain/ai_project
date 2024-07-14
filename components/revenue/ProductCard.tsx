'use client';

import { getUserByClerkId } from '@/lib/actions/user.action';
import Image from 'next/image';
import React, { useEffect } from 'react';

interface Props {
  userId: string;
}

const ProductCard = ({ userId }: Props) => {
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getUserByClerkId(userId);
        if (!response) {
          return console.error('User not found');
        }
        setProducts(response.user.products);
        console.log(response.user.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [userId]);
  return (
    <div className='flex flex-col w-full gap-2'>
      <div className='w-full py-2 px-5 text-center bg-mycolor-200'>my products</div>
      <div className='flex mt-5 gap-2 flex-wrap justify-center items-center'>
        {products.map((product: { name: string; picture: string }) => (
          <div className='bg-mycolor-300 p-5 w-[160px] h-[220px]'>
            <div>{product.name}</div>
            <Image
              src={product.picture}
              width={100}
              height={100}
              className='w-[160px] height[220px]'
              alt={product.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
