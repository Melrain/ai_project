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
    transactions: []
  });
  const [message, setMessage] = React.useState('');
  const [withdrawTransactions, setWithdrawTransactions] = React.useState([]);

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
        setMessage('提现失败');
        return console.error("Withdraw request wasn't created");
      }
      setMessage('提现成功');
    } catch (error) {
      console.error(error);
      setMessage('提现失败');
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

  // fetchWithdrawTransactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getRequestWithUserId({ userId });
        if (!res) {
          return console.log('Withdraw requests not found');
        }
        setWithdrawTransactions(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactions();
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
          setUser(fullDocument);
        }
      }
    };
    login();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 '>
        <div className='mt-10'>{user && <p>当前余额: {user?.balance}</p>}</div>
        <FormField
          name='amount'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>金额</FormLabel>
              <FormControl>
                <Input {...field} type='number' />
              </FormControl>
            </FormItem>
          )}
        />
        <FormMessage />
        <Button type='submit' className='bg-mycolor-300 text-white rounded-[3px]'>
          提交
        </Button>
      </form>
      <div className='mt-10 text-red-500'>
        <p>{message}</p>
      </div>
      <div></div>
    </Form>
  );
};

export default WithdrawForm;
