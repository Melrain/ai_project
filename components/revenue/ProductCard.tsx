'use client';

import { getUserByClerkId } from '@/lib/actions/user.action';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Spinner from '../shared/Spinner';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

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
    <div>
      {products.length === 0 ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className='flex flex-col w-full  gap-2'>
          <div className='w-full py-2 px-5 text-center bg-mycolor-200'>我的产品</div>
          <div className='flex mt-5 gap-2 flex-wrap justify-start items-center px-5'>
            {products.map((product: { name: string; picture: string; revenuePerDay: number }) => (
              <div className='flex flex-col justify-center items-center p-5 w-[160px] h-[220px]'>
                <div>{product.name}</div>
                <Image
                  src={product.picture}
                  width={100}
                  height={100}
                  className='w-[160px] height[220px] opacity-50'
                  alt={product.name}
                />
                <div className='absolute'>
                  <div className='flex justify-center items-center flex-col gap-1'>
                    <motion.div
                      initial={{ originY: 0 }}
                      animate={{ y: -100, opacity: 0, transitionEnd: { display: 'none' } }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 1 }}
                    >
                      <span className='text-green-500'>+</span> <DollarSign className='text-green-500' />
                    </motion.div>
                    <p className='text-green-400 font-bold shadow-purple-500 shadow-lg'> Profiting...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
