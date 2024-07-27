'use client';
import React from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus, PlusCircle } from 'lucide-react';

const formSchema = z.object({
  avaliable: z.boolean(),
  state: z.string(),
  type: z.string(),
  name: z.string(),
  title: z.string(),
  notes: z.string(),
  description: z.string(),
  contractText: z.string(),
  contractPicture: z.string(),
  price: z.coerce.number(),
  display: z.boolean(),
  pictureCollection: z.string(),
  picture: z.string(),
  users: z.array(z.string()),
  revenuePerDay: z.coerce.number(),
  levelRequirement: z.coerce.number(),
  expOnPurchase: z.coerce.number(),
  order: z.coerce.number()
});

const AddProduct = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avaliable: true,
      state: 'pending',
      type: 'product',
      name: '',
      title: '',
      notes: '',
      description: '',
      contractText: '',
      contractPicture: '',
      price: 0,
      display: true,
      pictureCollection: '',
      picture: '',
      users: [],
      revenuePerDay: 0,
      levelRequirement: 0,
      expOnPurchase: 0,
      order: 0
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col mt-10 w-full justify-center items-center'>
        <FormField
          control={form.control}
          name='picture'
          render={({ field }) => (
            <div className='flex justify-center bg-white shadow-lg w-full max-w-[320px] items-center h-[180px] rounded-[4px] flex-col'>
              {form.getValues('picture') ? (
                <div>has picure</div>
              ) : (
                <>
                  {' '}
                  <FormLabel className='text-slate-500'>产品图片</FormLabel>
                  <Plus className='size-16 text-green-500' />
                </>
              )}
            </div>
          )}
        />
      </form>
    </Form>
  );
};

export default AddProduct;
