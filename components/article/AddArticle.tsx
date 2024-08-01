'use client';
import React from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Separator } from '../ui/separator';

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
  if (!isAdmin) {
    return <div>You are not superAdmin</div>;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
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
        className='flex flex-row flex-wrap gap-5 max-w-7xl justify-center items-center p-5 w-full'
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
      </form>
    </Form>
  );
};

export default AddArticle;
