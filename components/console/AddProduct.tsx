'use client';
import React from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus, PlusCircle, X } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { productImagesIndex } from '@/lib/imageIndex';
import classNames from 'classnames';

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
  const [picture, setPicture] = React.useState<string>('');
  const [isImagesOpen, setIsImagesOpen] = React.useState<boolean>(false);

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
        <div className='w-full flex justify-center'>
          {/* 图片 */}
          <FormField
            control={form.control}
            name='picture'
            render={({ field }) => (
              <div className='flex justify-center bg-slate-500 shadow-lg w-full max-w-[320px] items-center h-[180px] rounded-[4px] flex-col'>
                {picture ? (
                  <div
                    className=' cursor-pointer flex flex-col justify-center items-center'
                    onClick={() => {
                      setPicture('');
                      setIsImagesOpen(!isImagesOpen);
                    }}
                  >
                    <Image src={picture} alt={picture} width={60} height={60} className=' aspect-auto cursor-pointer' />
                    <span className='text-white'>更换图片</span>
                  </div>
                ) : (
                  <>
                    <Dialog open={isImagesOpen}>
                      <DialogTrigger
                        onClick={() => {
                          setIsImagesOpen(!isImagesOpen);
                        }}
                        className=' text-white text-xs py-1 px-2 rounded-[2px]'
                      >
                        <FormLabel className='text-white'>产品图片</FormLabel>
                        <Plus className='size-16 text-green-500' />
                      </DialogTrigger>
                      <DialogContent className='flex flex-col justify-center items-center'>
                        <DialogHeader />
                        <DialogTitle className='w-full text-center'>选择产品图片</DialogTitle>
                        <DialogDescription />
                        <div className='flex flex-row justify-center  flex-wrap items-center'>
                          {productImagesIndex.map((product, index) => (
                            <div key={index} className='p-2'>
                              <Image
                                className='cursor-pointer'
                                src={product.src}
                                alt={product.name}
                                width={50}
                                height={50}
                                onClick={() => {
                                  form.setValue('picture', product.src);
                                  setPicture(product.src);
                                  setIsImagesOpen(false);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        <div
                          className='absolute top-2 right-2 cursor-pointer'
                          onClick={() => {
                            setIsImagesOpen(false);
                          }}
                        >
                          <X />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </div>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default AddProduct;
