'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '../ui/form';

const formSchema = z.object({
  username: z.string().min(3, { message: 'minimun letter is 3' }).max(20, { message: 'maxium letter is 20' }),
  first_name: z.string().min(3, { message: 'minimun letter is 3' }).max(20, { message: 'maxium letter is 20' }),
  last_name: z.string().min(3, { message: 'minimun letter is 3' }).max(20, { message: 'maxium letter is 20' }),
  phone: z.object({
    number: z.string().min(10, { message: 'minimun letter is 10' }).max(10, { message: 'maxium letter is 10' }),
    verified: z.boolean()
  }),
  inviteLink: z.string().url(),
  supervisor: z.string(),
  balance: z.coerce.number()
});

const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      first_name: '',
      last_name: '',
      phone: {
        number: '',
        verified: false
      },
      inviteLink: '',
      supervisor: '',
      balance: 0
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='border-2 border-white'>
        <FormField name='username' control={form.control} render={({ field }) => <div></div>} />
      </form>
    </Form>
  );
};

export default SignUpForm;
