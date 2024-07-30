'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { getUserByClerkId } from '@/lib/actions/user.action';
import Link from 'next/link';
import { createWithdrawRequest, getRequestWithUserId } from '@/lib/actions/withdrawRequest.action';
import * as Realm from 'realm-web';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  amount: z.coerce.number().positive().int().min(1)
});

interface Props {
  userId: string;
  clerkId: string;
}

const WithdrawForm = ({ userId, clerkId }: Props) => {
  const [user, setUser] = React.useState({
    balance: 0,
    transactions: [],
    withdrawRequests: []
  });
  const [message, setMessage] = React.useState('');

  const app = new Realm.App({ id: process.env.NEXT_PUBLIC_MONGODB_APP_ID! });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0
    }
  });

  if (!userId) {
    return (
      <div className='flex  justify-center items-center gap-10 flex-col'>
        <div>需要登录才能提现</div>
        <Link href={'/sign-in'} className='bg-mycolor-300 p-2 px-4 rounded-[3px]'>
          登录
        </Link>
      </div>
    );
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      if (values.amount > user.balance) {
        setMessage('提现金额不能大于余额');
        return alert('提现金额不能大于余额');
      }
      const res = await createWithdrawRequest({
        userId,
        amount: values.amount,
        state: 'pending'
      });
      if (!res) {
        setMessage('提现订单失败');
        return console.error("Withdraw request wasn't created");
      }
      setMessage('已提交提现订单');
    } catch (error) {
      console.error(error);
      setMessage('提交订单失败');
    }
  };

  // fetchUser
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await getUserByClerkId(clerkId);
        if (!userRes) {
          return console.log('User not found');
        }
        setUser(userRes.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [userId]);

  // realtime update

  useEffect(() => {
    const login = async () => {
      await app.logIn(Realm.Credentials.anonymous());
      const mongodb = app.currentUser?.mongoClient('mongodb-atlas');
      const collection = mongodb?.db('NvidiaAI_DB').collection('users');
      if (!collection) return;
      for await (const change of collection.watch({ clerkId: userId })) {
        if (
          change.operationType === 'insert' ||
          change.operationType === 'update' ||
          change.operationType === 'replace'
        ) {
          const fullDocument = change.fullDocument;
          console.log(fullDocument);
          setUser(fullDocument);
        }
      }
    };
    login();
  }, []);

  return (
    <div className='flex flex-col w-full h-screen items-center gap-10'>
      <div className='w-full bg-gradient-to-br py-2 flex justify-center items-center rounded-[3px] from-mycolor-300 to-indigo-950'>
        <h1>提现请求</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full bg-gradient-to-br from-slate-800 via-mycolor-300 to-slate-800 flex justify-center items-center flex-col'
        >
          <div className='mt-10 flex flex-col'>
            {user && <p>当前余额: ${user?.balance}</p>}
            <Separator className='bg-mycolor-300 h-[2px]' />
          </div>
          <FormField
            name='amount'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>金额</FormLabel>
                <FormControl>
                  <Input className='bg-mycolor-300 text-white rounded-[4px]  text-[16px]' {...field} type='number' />
                </FormControl>
              </FormItem>
            )}
          />
          <FormMessage />
          <Button type='submit' className='bg-mycolor-300 text-white rounded-[3px]'>
            提交
          </Button>
          <div className='mt-10 text-red-500'>
            <p>{message}</p>
          </div>
        </form>
      </Form>
      <div className='flex flex-col w-full gap-5'>
        <div className='w-full bg-gradient-to-br py-2 flex justify-center items-center rounded-[3px] from-mycolor-300 to-indigo-900'>
          <h1>提现订单记录</h1>
        </div>
        <div>
          {user.withdrawRequests.map((request) => (
            <div>1</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WithdrawForm;
