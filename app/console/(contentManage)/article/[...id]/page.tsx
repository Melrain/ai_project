import { getArticle } from '@/lib/articles/article.action';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async (slugs: {
  params: {
    id: string[];
  };
}) => {
  const id = slugs.params.id[0];
  if (slugs.params.id.length > 1) {
    redirect(`/console/article/${id[0]}`);
  }
  const article = await getArticle({ articleId: id });
  if (!article) {
    return <div>Article not found</div>;
  }
  console.log('Article:', article);
  return <div>标题：{article.title}</div>;
};

export default page;
