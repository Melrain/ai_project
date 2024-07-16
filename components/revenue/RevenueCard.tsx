'use client';

import { getUserByClerkId } from '@/lib/actions/user.action';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Spinner from '../shared/Spinner';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { calculateProfit } from '@/lib/actions/functions';
import TimeTabs from './TimeTabs';
import ProfitTabs from './ProfitTabs';

interface Props {
  userId: string;
}

// TODO 今天完成利润显示，持有时间显示，还有点击收集的时候出现dialog

const RevenueCard = ({ userId }: Props) => {
  const [products, setProducts] = React.useState<
    {
      id: any;
      name: string;
      picture: string;
      revenuePerDay: number;
    }[]
  >([]);

  const [profitAndTimeInfo, setProfitAndTimeInfo] = React.useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getUserByClerkId(userId);
        if (!response) {
          return console.error('User not found');
        }
        setProducts(response.user.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [userId]);

  return (
    <div className=''>
      {products.length === 0 ? (
        <div className='w-full flex justify-center items-center'>
          <Spinner />
        </div>
      ) : (
        <div className='flex flex-col w-full  gap-2'>
          <div className='w-full py-2 px-5 text-center bg-mycolor-200'>我的产品</div>
          <div className='flex mt-5 gap-5 flex-wrap justify-center items-center px-5'>
            {products.map((item: any) => (
              <div className='flex flex-col justify-center items-center bg-gradient-to-b from-purple-800 to-mycolor-300 rounded-[8px] outline-4 outline-offset-6 shadow-md shadow-purple-500 p-5 w-[140px] h-[220px]'>
                <div>{item.product.name}</div>
                <Image
                  src={item.product.picture}
                  width={100}
                  height={100}
                  className=' h-[100px] opacity-50'
                  alt={item.product.name}
                />
                <div className='absolute'>
                  <div className='flex justify-center items-center flex-col gap-1'>
                    <motion.div
                      initial={{}}
                      animate={{ y: [0, -50, -100, 0], opacity: [0, 25, 100, 0, 0, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 3 }}
                    >
                      <span className='text-green-500'>+</span> <DollarSign className='text-green-500' />
                    </motion.div>
                    <div>
                      <ProfitTabs userId={userId} productId={item.product._id} />
                    </div>
                    <div>
                      <TimeTabs />
                    </div>
                  </div>
                </div>
                <div className='mt-10'>收集</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueCard;
