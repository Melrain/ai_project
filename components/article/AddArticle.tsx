'use client';
import React, { useEffect } from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Separator } from '../ui/separator';
import Image from 'next/image';
import { Edit, Plus, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Button } from '../ui/button';

const formSchema = z.object({
  type: z.string().min(1).max(255),
  display: z.boolean(),
  title: z.string().min(1).max(255),
  picture: z.string().min(1),
  content: z.string().min(1)
});

interface Props {
  isAdmin: boolean;
}
const AddArticle = ({ isAdmin }: Props) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [picture, setPicture] = React.useState('');
  const [isImagesOpen, setIsImagesOpen] = React.useState(false);
  if (!isAdmin) {
    return <div>You are not superAdmin</div>;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'regular article',
      display: true,
      title: '',
      picture: '',
      content: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      console.log(values);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  //data

  const ipfsImages = [
    {
      name: 'image01',
      src: 'https://ipfs.filebase.io/ipfs/QmS94cuxMKbQj3eSBqFwreSbw1UJpH4BATG5fFfHWkEmyp/news01.png'
    },

    {
      name: 'image03',
      src: 'https://ipfs.filebase.io/ipfs/QmS94cuxMKbQj3eSBqFwreSbw1UJpH4BATG5fFfHWkEmyp/news3.png'
    }
  ];

  const articleTypes = [
    { name: '常规文章', value: 'regular article' },
    { name: '世界新闻', value: 'world news' },
    { name: '讨论话题', value: 'discussion' },
    { name: '技术分析', value: 'technical analysis' }
  ];

  const displayOption = [
    {
      name: '显示',
      value: 'display'
    },
    {
      name: '隐藏',
      value: 'hide'
    }
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-row flex-wrap gap-5 max-w-4xl justify-center items-center p-5 w-full'
      >
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <div className='flex flex-col gap-2'>
              <FormItem className='flex  w-full max-w-[300px] flex-row justify-start  p-4  items-center gap-10 '>
                <FormLabel className='text-center text-nowrap'>文章类型:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={'regular article'}
                    className='flex flex-col space-y-1'
                  >
                    {articleTypes.map((type) => (
                      <FormItem key={type.value} className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value={type.value} />
                        </FormControl>
                        <FormLabel className='font-normal'>{type.name}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            </div>
          )}
        />
        <Separator orientation='vertical' className='w-[1px] bg-slate-300 h-20' />
        <FormField
          name='display'
          render={({ field }) => (
            <div className='flex flex-col gap-2'>
              <FormItem className='flex  w-full max-w-[300px] flex-row justify-start  p-4  items-center gap-10 '>
                <FormLabel className='text-center text-nowrap'>是否显示:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={'display'}
                    className='flex flex-col space-y-1'
                  >
                    {displayOption.map((item) => (
                      <FormItem key={item.value} className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value={item.value} />
                        </FormControl>
                        <FormLabel className='font-normal'>{item.name}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            </div>
          )}
        />

        <FormField
          name='title'
          render={({ field }) => (
            <div className='w-full flex justify-center items-center max-w-[360px]'>
              <FormItem>
                <FormLabel className='text-center text-nowrap'>文章标题:</FormLabel>
                <FormControl className='flex flex-row justify-center items-center'>
                  <Input {...field} placeholder='文章标题' className='bg-white rounded-[4px]' />
                </FormControl>
              </FormItem>
            </div>
          )}
        />

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
                    className=' aspect-auto  cursor-pointer object-contain'
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
                      <FormLabel className='text-white'>文章图片</FormLabel>
                      <Plus className='size-16 text-green-500' />
                    </DialogTrigger>

                    <DialogContent className='flex flex-col justify-center items-center'>
                      <DialogHeader />
                      <DialogTitle className='w-full text-center'>选择文章图片: 静态显示</DialogTitle>
                      <DialogDescription />
                      <div className='flex flex-row justify-center  flex-wrap items-center'>
                        {ipfsImages.map((image, index) => (
                          <div key={index} className='p-2'>
                            <Image
                              className='cursor-pointer object-fit w-[80px] h-auto'
                              src={image.src}
                              alt={image.name}
                              width={50}
                              height={50}
                              onClick={() => {
                                form.setValue('picture', image.src);
                                setPicture(image.src);
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
        <FormField
          name='content'
          render={({ field }) => (
            <div className='w-full'>
              <FormItem>
                <FormLabel className='text-slate-500'>文章内容:</FormLabel>
                <FormControl>
                  <textarea {...field} className='w-full h-96 bg-white rounded-[4px] p-2' />
                </FormControl>
              </FormItem>
            </div>
          )}
        />
        <Button type='submit' disabled={isSubmitting} className='w-full bg-mycolor-300 text-white  max-w-[320px]'>
          提交
        </Button>
      </form>
    </Form>
  );
};

export default AddArticle;
