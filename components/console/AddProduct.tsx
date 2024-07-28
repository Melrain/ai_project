'use client';
import React from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Edit, Plus, PlusCircle, X } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { productImagesIndex } from '@/lib/imageIndex';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  avaliable: z.boolean(),
  state: z.string(),
  type: z.string(),
  name: z.string().min(3),
  title: z.string().min(3),
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
      state: 'normal',
      type: 'milkTea',
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex bg-slate-200 py-10 flex-col w-full   items-center'>
        <div className='w-full flex justify-center flex-col gap-5 items-center'>
          {/* 标题 */}
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <div className='max-w-[300px] w-full'>
                <FormLabel>标题</FormLabel>
                <Input {...field} className='bg-white rounded-[4px] shadow-md text-[16px]' />
                <FormMessage {...field} />
              </div>
            )}
          />
          {/* 产品名字 */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <div className='max-w-[300px] w-full'>
                <FormLabel>产品名字</FormLabel>
                <Input {...field} className='bg-white rounded-[4px] shadow-md text-[16px]' />
                <FormMessage {...field} />
              </div>
            )}
          />
          {/* 备注 */}
          <FormField
            control={form.control}
            name='notes'
            render={({ field }) => (
              <div className='max-w-[300px] w-full'>
                <FormLabel>备注</FormLabel>
                <Input {...field} className='bg-white rounded-[4px] shadow-md text-[16px]' />
                <FormMessage {...field} />
              </div>
            )}
          />
          {/* 产品类型 */}
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem className='flex  w-full max-w-[300px] flex-row justify-start  p-4  items-center gap-10 '>
                <FormLabel className='text-center text-nowrap'>产品类型:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={'milkTea'}
                    className='flex flex-col space-y-1'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='milkTea' />
                      </FormControl>
                      <FormLabel className='font-normal'>奶茶</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='gpu' />
                      </FormControl>
                      <FormLabel className='font-normal'>显卡机器</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='asic' />
                      </FormControl>
                      <FormLabel className='font-normal'>ASIC矿机</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          {/* 产品状态 */}
          <FormField
            control={form.control}
            name='state'
            render={({ field }) => (
              <FormItem className='flex  w-full max-w-[300px] flex-row justify-start  p-4  items-center gap-10 '>
                <FormLabel className='text-center text-nowrap'>产品状态:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={'normal'}
                    className='flex flex-col space-y-1'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='normal' />
                      </FormControl>
                      <FormLabel className='font-normal'>正常</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='hidden' />
                      </FormControl>
                      <FormLabel className='font-normal'>隐藏: 创建但不显示</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='timeLimit' />
                      </FormControl>
                      <FormLabel className='font-normal'>限时: 时间</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          {/* 图片 */}
          <FormField
            control={form.control}
            name='picture'
            render={({ field }) => (
              <div
                className={`flex justify-center ${picture ? 'bg-slate-200' : 'bg-slate-400'} shadow-lg w-full max-w-[320px] items-center h-[180px] rounded-[4px] flex-col relative`}
              >
                {picture ? (
                  <div className=' cursor-pointer flex flex-col justify-center items-center'>
                    <Image
                      src={picture}
                      alt={picture}
                      width={80}
                      height={60}
                      className=' shad aspect-auto cursor-pointer'
                    />
                    <span
                      className='absolute top-2 right-2 cursor-pointer'
                      onClick={() => {
                        setPicture('');
                        setIsImagesOpen(!isImagesOpen);
                      }}
                    >
                      <Edit className='text-green-600' />
                    </span>
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
          {/* 产品介绍 */}
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <div className='w-full max-w-[320px]'>
                <Label htmlFor='product-description'>产品介绍</Label>
                <Textarea
                  {...field}
                  className='bg-white text-[16px] w-full border-0'
                  placeholder='输入介绍...'
                  id='product-description'
                />
              </div>
            )}
          />
        </div>
        <div>
          <Button type='submit' className='mt-10 bg-primary-500 text-white rounded-[4px]'>
            添加产品
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProduct;
