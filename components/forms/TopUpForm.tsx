'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { ColorfulButton } from '../buttons/ColorfulButton';
import BorderMagicLabel from '../buttons/BorderMagicLabel';
import { addBalanceAndTxId, getUserByClerkId } from '@/lib/actions/user.action';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import * as Realm from 'realm-web';
import { useBalanceStore } from '@/store/useBalanceStore';

import { useTranscationsStore } from '@/store/useTransactionsStore';
import Spinner from '../shared/Spinner';
import { createTopupTransaction } from '@/lib/actions/topup.action';

const formSchema = z.object({
  amount: z.coerce.number().positive().int()
});

const TopUpForm = () => {
  const [selectedAmount, setSelectedAmount] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState({
    success: false,
    message: ''
  });

  // zustand
  const useBalance = useBalanceStore((state: any) => state.balance);
  const setUseBalance = (amount: number) => useBalanceStore.setState({ balance: amount });
  const setTransactions = (transactions: any) => useTranscationsStore.setState({ transactions });

  const app = new Realm.App({ id: process.env.NEXT_PUBLIC_MONGODB_APP_ID! });
  const router = useRouter();
  const { userId } = useAuth();

  if (userId === undefined || userId === null || !userId) {
    router.push('/sign-in');
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0
    }
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMessage({
        success: false,
        message: ''
      });
      setIsSubmitting(true);

      const userResult = await getUserByClerkId(userId!);
      if (!userResult) {
        setMessage({
          success: false,
          message: '无法获取用户'
        });
        throw new Error('Failed to get user');
      }
      const topupResult = await createTopupTransaction({
        type: 'topup',
        mongoUserId: userResult.user._id,
        isFirstTopup: userResult.user.firstTimeTopup,
        amount: values.amount,
        status: 'pending'
      });

      if (!topupResult) {
        setMessage({
          success: false,
          message: '无法创建充值交易'
        });
        throw new Error('Failed to create topup transaction');
      }
      setMessage({
        success: true,
        message: `充值成功! 金额: ${values.amount}`
      });
      console.log(topupResult);
    } catch (error) {
      setMessage({
        success: false,
        message: '充值失败'
      });
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
  };

  const onLabelClick = (amount: number) => {
    form.setValue('amount', amount);
    setSelectedAmount(amount.toString());
  };

  useEffect(() => {
    if (form.getValues('amount').toString() !== selectedAmount) {
      setSelectedAmount('');
    }
  }, [form.getValues('amount')]);

  //Mongodb watch

  useEffect(() => {
    const login = async () => {
      // Authenticate anonymously
      await app.logIn(Realm.Credentials.anonymous());

      const result = await getUserByClerkId(userId!);
      if (!result) {
        throw new Error('Failed to get user at topUpform.tsx line 100');
      }
      console.log(result);
      if (result.user === null) {
        return (
          <div>
            <Spinner w={'8'} h={'8'} />
          </div>
        );
      }

      //set zustand
      setUseBalance(result.user.balance);
      setTransactions(Object.keys(result.user.transactions).map((key) => result.user.transactions[key]));

      const mongodb = app.currentUser?.mongoClient('mongodb-atlas');
      const collection = mongodb?.db('NvidiaAI_DB').collection('users'); // Everytime a change happens in the stream, add it to the list of events
      if (!collection) return;
      // eslint-disable-next-line no-unused-vars
      for await (const change of collection.watch({ clerkId: userId })) {
        if (
          change.operationType === 'insert' ||
          change.operationType === 'update' ||
          change.operationType === 'replace'
        ) {
          const fullDocument = change.fullDocument;
          setUseBalance(fullDocument.balance);
          setTransactions(Object.keys(fullDocument.transactions).map((key) => fullDocument.transactions[key]));
        }
      }
    };
    login();
  }, []);

  return (
    <div className='w-full  flex flex-col justify-center items-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='px-10 max-w-xl'>
          <div className='flex justify-center gap-5'>
            <h1 className='flex flex-row gap-2 text-xl'>
              Balance: <span className='text-slate-500'>{useBalance ? useBalance : <Spinner w={'4'} h={'4'} />}</span>
            </h1>
          </div>
          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel className='text-slate-500'>Top-up</FormLabel>
                <FormControl>
                  <Input {...field} type='number' />
                </FormControl>
                <FormDescription></FormDescription>
                <div className='flex flex-row gap-2 py-5 text-slate-300'>
                  <div
                    onClick={() => {
                      onLabelClick(500);
                    }}
                  >
                    <BorderMagicLabel
                      content='$500'
                      className={`${selectedAmount === '500' ? 'text-green-500' : ''}`}
                    />
                  </div>
                  <div
                    onClick={() => {
                      onLabelClick(1500);
                    }}
                  >
                    <BorderMagicLabel
                      content='$1500'
                      className={`${selectedAmount === '1500' ? 'text-green-500' : ''}`}
                    />
                  </div>
                  <div
                    onClick={() => {
                      onLabelClick(5000);
                    }}
                  >
                    <BorderMagicLabel
                      content='$5000'
                      className={`${selectedAmount === '5000' ? 'text-green-500' : ''}`}
                    />
                  </div>
                  <div
                    onClick={() => {
                      onLabelClick(10000);
                    }}
                  >
                    <BorderMagicLabel
                      content='$10000'
                      className={`${selectedAmount === '10000' ? 'text-green-500' : ''}`}
                    />
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='mt-5 flex justify-center w-full'>
            <ColorfulButton content='TopUp' disabled={isSubmitting} />
          </div>
        </form>
        <div className={`mt-5 ${message.success ? 'text-green-500' : 'text-red-500'}`}>{message.message}</div>
      </Form>
    </div>
  );
};

export default TopUpForm;
