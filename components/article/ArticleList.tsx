'use client';
import React, { useEffect } from 'react';
import { DataTable } from '../admin/table/data-table';
import { columnsArticle } from './Columns-article';
import { getAllArticles } from '@/lib/articles/article.action';
import { formatTime } from '@/lib/utils';

const ArticleList = () => {
  const [articles, setArticles] = React.useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await getAllArticles();

      setArticles(
        articles.map((article: { createdAt: string }) => ({
          ...article,
          createdAt: formatTime(article.createdAt)
        }))
      );
    };
    fetchArticles();
  }, []);

  return (
    <div className='flex w-full  max-w-4xl px-2'>
      <DataTable
        columns={columnsArticle}
        data={articles}
        placeholder={'输入名称查询...'}
        searchParams={'title'}
        mode={'white'}
      />
    </div>
  );
};

export default ArticleList;
