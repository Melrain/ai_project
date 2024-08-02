import AddArticle from '@/components/article/AddArticle';
import ArticleList from '@/components/article/ArticleList';
import { getUserByClerkId } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { BookAIcon, List } from 'lucide-react';
import { ZCOOL_QingKe_HuangYou } from 'next/font/google';
import React from 'react';

const zcoolFont = ZCOOL_QingKe_HuangYou({
  weight: '400',
  subsets: ['latin']
});

const page = async () => {
  const { userId } = auth();
  const userRes = await getUserByClerkId(userId!);
  if (!userRes) {
    return;
  }

  return (
    <div className='flex w-full  flex-col gap-10 '>
      <div className='flex w-full px-2 flex-row items-center justify-start'>
        <BookAIcon />
        <h1 className={`text-xl  ${zcoolFont.className}`}>创建文章</h1>
      </div>
      <div className='flex justify-center  w-full gap-5 bg-slate-200 items-center'>
        <AddArticle isAdmin={userRes.user.type === 'super admin'} />
      </div>
      <div className='flex w-full px-2 flex-row items-center justify-start'>
        <List />
        <h1 className={`text-xl`}>文章列表</h1>
      </div>
      <div className='flex justify-center w-full'>
        <ArticleList />
      </div>
    </div>
  );
};

export default page;
