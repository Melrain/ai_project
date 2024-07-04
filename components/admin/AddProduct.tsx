'use client';
import React from 'react';
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

const formSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().int(),
  picture: z.string().url(),
  revenuePerDay: z.coerce.number()
});

const AddProduct = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const useErrorMessage = useProductErrorStore((state: any) => state.errorMessage);
  const setErrorMessage = (message: any) => useProductErrorStore.setState({ errorMessage: message });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 0,
      picture: '',
      revenuePerDay: 0
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      //TODO finish the form
      setIsSubmitting(true);
      console.log(values);
      // check if form is valid
      console.log(form.formState.isValid);
      if (!form.formState.isValid) {
        return setErrorMessage('创建产品时格式输入错误，请检查！');
      }
      setErrorMessage('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col justify-center gap-5'>
      <div className='text-red-500'>{useErrorMessage}</div>
      <Dialog>
        <DialogTrigger className='p-2 px-4 rounded-[4px] bg-mycolor-200'>创建产品</DialogTrigger>
        <DialogContent className='max-w-xs text-slate-500 '>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription>
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
                    <FormField
                      name='picture'
                      control={form.control}
                      render={({ field }) => (
                        <div className='flex p-2 w-full max-w-[220px] flex-row gap-2 items-center'>
                          <p className='flex text-nowrap'>图片链接</p>
                          <Input {...field} placeholder='图片url' />
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
                  </div>
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose disabled={isSubmitting} className='mt-5'>
                  <button
                    type='submit'
                    onClick={() => {
                      onSubmit(form.getValues());
                    }}
                  >
                    <ColorfulButton content={'确认创建'} disabled={isSubmitting} />
                  </button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProduct;
