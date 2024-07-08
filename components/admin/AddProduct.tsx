'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormMessage } from '../ui/form';
import { DialogClose } from '@radix-ui/react-dialog';
import { Input } from '../ui/input';
import { ColorfulButton } from '../buttons/ColorfulButton';
import { useProductErrorStore } from '@/store/useProductErrorStore';
import { createProduct } from '@/lib/actions/product';
import { X } from 'lucide-react';
import ImagesDialog from '../shared/ImagesDialog';

import Image from 'next/image';
import { productImagesIndex } from '@/lib/imageIndex';

const formSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().int(),
  picture: z.string(),
  revenuePerDay: z.coerce.number(),
  levelRequirement: z.coerce.number(),
  passcode: z.coerce.number()
});

const AddProduct = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const useErrorMessage = useProductErrorStore((state: any) => state.errorMessage);
  const setErrorMessage = (message: any) => useProductErrorStore.setState({ errorMessage: message });
  const [isOpen, setIsOpen] = useState(false);
  const [isImagesOpen, setIsImagesOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 0,
      picture: '',
      revenuePerDay: 0,
      levelRequirement: 1,
      passcode: 0
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      console.log(values);
      // check if form is valid
      await form.trigger();
      console.log(form.formState.isValid);
      if (!form.formState.isValid) {
        return setErrorMessage('创建产品时格式输入错误，请检查！');
      }
      setErrorMessage('');
      const result = await createProduct({
        productName: values.name,
        price: values.price,
        picture: values.picture,
        revenuePerDay: values.revenuePerDay,
        levelRequirement: values.levelRequirement,
        passcode: values.passcode
      });
      if (result?.code !== 200) {
        console.log(result);
        return setErrorMessage('创建产品失败！请联系技术...');
      }
      setErrorMessage('创建成功!');
      console.log(result?.product);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setIsOpen(false);
    }
  };

  return (
    <div className='flex flex-col justify-center gap-5'>
      <div className='text-red-500'>{useErrorMessage}</div>
      <Dialog open={isOpen}>
        <DialogTrigger
          className='p-2 px-4 rounded-[4px] bg-mycolor-200'
          onClick={() => {
            setIsOpen(true);
          }}
        >
          创建产品
        </DialogTrigger>
        <DialogTitle />
        <DialogDescription />
        <DialogContent className='max-w-xs text-slate-500 '>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* form fields */}
              <div className='flex flex-col justify-center items-center '>
                <FormField
                  name='name'
                  control={form.control}
                  render={({ field }) => (
                    <div className='flex p-2 w-full max-w-[220px] flex-row gap-2 items-center'>
                      <p className='flex text-nowrap'>产品名称</p>
                      <Input {...field} placeholder='产品名称' className='' />
                    </div>
                  )}
                />
                <FormField
                  name='price'
                  control={form.control}
                  render={({ field }) => (
                    <div className='flex p-2 w-full max-w-[220px] flex-row gap-2 items-center'>
                      <p className='flex text-nowrap'>输入价格</p>
                      <Input type='number' {...field} placeholder='价格' />
                    </div>
                  )}
                />
                {/* 选择图片 */}

                <FormField
                  name='picture'
                  control={form.control}
                  render={({ field }) => (
                    <div className='flex p-2 w-full max-w-[220px] flex-row gap-2 items-center'>
                      <p className='flex text-nowrap'>产品图片</p>
                      {/* <Input {...field} placeholder='图片url' /> */}
                      <Dialog open={isImagesOpen}>
                        <DialogTrigger
                          onClick={() => {
                            setIsImagesOpen(true);
                          }}
                          className=' text-white text-xs py-1 px-2 rounded-[2px]'
                        >
                          {form.getValues().picture ? (
                            <Image height={40} width={40} alt={form.getValues().name} src={form.getValues().picture} />
                          ) : (
                            '选择图片'
                          )}
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
                                    setIsImagesOpen(false);
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                />
                <FormField
                  name='revenuePerDay'
                  control={form.control}
                  render={({ field }) => (
                    <div className='flex p-2 w-full max-w-[220px] flex-row gap-2 items-center'>
                      <p className='flex text-nowrap'>投资回报</p>
                      <Input {...field} placeholder='回报率' />
                    </div>
                  )}
                />
                <FormField
                  name='levelRequirement'
                  control={form.control}
                  render={({ field }) => (
                    <div className='flex p-2 w-full max-w-[220px] flex-row gap-2 items-center'>
                      <p className='flex text-nowrap'>等级要求</p>
                      <Input type='number' {...field} placeholder='level...' />
                    </div>
                  )}
                />
                <FormField
                  name='passcode'
                  control={form.control}
                  render={({ field }) => (
                    <div className='flex p-2 w-full max-w-[220px] flex-row gap-2 items-center'>
                      <p className='flex text-nowrap'>管理密码</p>
                      <Input type='number' {...field} placeholder='passcode...' />
                    </div>
                  )}
                />
              </div>
              {/* close icon */}
              <div
                className='absolute right-2 top-1 text-white'
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <X className='text-slate-500' />
              </div>

              <DialogFooter>
                <div
                  className='mt-5'
                  onClick={() => {
                    onSubmit(form.getValues());
                  }}
                >
                  <ColorfulButton content={'确认创建'} disabled={isSubmitting} />
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProduct;
