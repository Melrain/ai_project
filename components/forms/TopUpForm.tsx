'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { ColorfulButton } from '../buttons/ColorfulButton';
import BorderMagicLabel from '../buttons/BorderMagicLabel';

const formSchema = z.object({
  amount: z.coerce.number().positive().int()
});

const TopUpForm = () => {
  const [selectedAmount, setSelectedAmount] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0
    }
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      console.log(values);

      // topup actions here
    } catch (error) {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='px-10 max-w-xl'>
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
                  <BorderMagicLabel content='$500' className={`${selectedAmount === '500' ? 'text-green-500' : ''}`} />
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
    </Form>
  );
};

export default TopUpForm;
