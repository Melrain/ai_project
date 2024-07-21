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
import { getUserTransactions } from '@/lib/actions/transaction.action';
import { formatTime } from '@/lib/utils';

interface Props {
  userId: string;
  mongoUserId: string;
}

const RevenueCard = ({ userId, mongoUserId }: Props) => {
  const [products, setProducts] = React.useState<
    {
      id: any;
      name: string;
      picture: string;
      revenuePerDay: number;
    }[]
  >([]);

  const [currentProfit, setCurrentProfit] = React.useState(0);
  const [transactionsList, setTransactionsList] = React.useState<any[]>([]);

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

  //获取用户的profit的历史记录，并用realTime更新
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getUserTransactions({ userId: JSON.parse(mongoUserId) });
        if (!response) {
          return console.error('Transactions not found');
        }
        console.log(response.transactions);
        const profitTransactions = response.transactions.filter(
          (item: { type: string }) => item.type === 'collectProfit'
        );
        console.log(profitTransactions);
        setTransactionsList(profitTransactions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactions();
  }, []);

  // 获取用户的产品列表
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

  if (products.length === 0) {
    return <div>您还未购买设备</div>;
  }

  return (
    <div className=''>
      {products.length === 0 ? (
        <div className='w-full flex justify-center items-center'>
          <Spinner w={'8'} h={'8'} />
        </div>
      ) : (
        <div className='flex flex-col w-full  gap-2'>
          <div className='w-full py-2 px-5 text-center bg-mycolor-300 rounded-[4px]'>我的产品</div>
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
          <div className='flex mt-10 flex-col gap-2 w-full'>
            {/* <div className='w-full rounded-[4px] flex justify-center items-center bg-mycolor-300 mt-10 py-2'>
              收益历史
            </div> */}
            <div className=''>
              <h1 className='text-xl text-slate-200'>收益历史记录</h1>
            </div>
            <div className='flex flex-col gap-2'>
              {transactionsList.length !== 0 &&
                transactionsList.map(
                  (
                    item: {
                      amount: number;
                      updatedAt: string;
                      notes: {
                        name: string;
                        id: {
                          picture: string;
                        };
                      };
                    },
                    index
                  ) => (
                    <div
                      className={`w-full flex-row items-center justify-between text-slate-500 flex  p-2 rounded-[4px] ${index % 2 === 0 ? 'bg-mycolor-200' : 'bg-mycolor-100'}`}
                    >
                      <div className='flex flex-row gap-2 justify-center items-center'>
                        <Image
                          src={item.notes.id.picture}
                          width={20}
                          height={20}
                          alt={item.notes.name}
                          className='  aspect-auto p-1 rounded-full h-[40px] w-[40px] '
                        />
                        <span> {item.notes.name}</span>
                      </div>
                      <span>${item.amount.toFixed(2)}</span>
                      <span className='text-xs'>{formatTime(item.updatedAt)}</span>
                    </div>
                  )
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueCard;
