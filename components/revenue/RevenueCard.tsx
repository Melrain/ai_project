'use client';

import { getUserByClerkId } from '@/lib/actions/user.action';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Spinner from '../shared/Spinner';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import TimeTabs from './TimeTabs';
import ProfitTabs from './ProfitTabs';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { calculateProfit, userCollectProfit } from '@/lib/actions/functions';
import { collectProfitLimite } from '@/utils/params';

interface Props {
  userId: string;
}

const RevenueCard = ({ userId }: Props) => {
  const [products, setProducts] = React.useState<
    {
      id: any;
      name: string;
      picture: string;
      revenuePerDay: number;
    }[]
  >([]);

  const [currentProfit, setCurrentProfit] = React.useState(0);

  // 获取收益按钮;

  const onButtonClick = async (productId: string) => {
    try {
      console.log(productId);
      const response = await calculateProfit({ userId, productId });
      console.log(response.currentProfit);
      setCurrentProfit(response.currentProfit);
    } catch (error) {
      console.error(error);
    }
  };

  const onCollect = async (productId: string) => {
    try {
      const profitResponse = await calculateProfit({ userId, productId });
      if (profitResponse.currentProfit < collectProfitLimite) {
        return console.error('profit is too low');
      }
      console.log(profitResponse.currentProfit);
      const response = await userCollectProfit({ userId, productId });
      if (!response) {
        return console.error('profit not found 1001');
      }
    } catch (error) {
      console.error(error);
    } finally {
      window.location.reload();
    }
  };

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
          <Spinner w={'8'} h={'8'} />
        </div>
      ) : (
        <div className='flex flex-col w-full  gap-2'>
          <div className='w-full py-2 px-5 text-center bg-gradient-to-r from-purple-600 rounded-[4px] via-mycolor-300 to-purple-800'>
            我的产品
          </div>
          <div className='flex mt-5 gap-5 flex-wrap justify-center items-center px-5'>
            {products.map((item: any) => (
              <div className='flex flex-col justify-center items-center bg-gradient-to-b from-purple-800 to-mycolor-300 rounded-[8px] outline-4 outline-offset-6 shadow-md shadow-purple-500 p-5 w-[140px] h-[220px]'>
                <div>{item.product.name}</div>
                <Image
                  src={item.product.picture}
                  width={100}
                  height={100}
                  className=' h-[100px] opacity-70'
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
                      <TimeTabs userId={userId} productId={item.product._id} />
                    </div>
                  </div>
                </div>
                {/* TODO 完成收集按钮 */}
                <AlertDialog>
                  <AlertDialogTrigger
                    className='w-full'
                    onClick={() => {
                      onButtonClick(item.product._id);
                    }}
                  >
                    <div className='mt-10 w-full justify-center items-center bg-mycolor-300  shadow-md  text-sm py-1 rounded-[4px] text-center'>
                      收集
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        分配收益: <span className='text-green-500'>{item.product.name}</span>
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                      分配收益后,当前该产品的收益会打入您的账户,同时收益开始重新计算; 当前预估收益:
                      <span className='text-green-500'> {currentProfit ? currentProfit : 'loading...'}</span>
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          onCollect(item.product._id);
                        }}
                        disabled={currentProfit < collectProfitLimite}
                      >
                        {currentProfit < collectProfitLimite ? (
                          <span>最小提款:${collectProfitLimite}</span>
                        ) : (
                          '确认收集'
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className='w-full flex flex-col'>
        {products.length === 0 ? (
          ''
        ) : (
          <div className='w-full rounded-[4px] flex justify-center items-center bg-mycolor-300 mt-10 py-2'>
            收益历史
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueCard;
