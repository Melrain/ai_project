'use client';

import { getProduct } from '@/lib/actions/product';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SearchResult = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState({
    name: '',
    price: '',
    picture: '',
    revenuePerDay: 0,
    level: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchParams.get('name') === null) return null;
        const product = await getProduct({ productName: searchParams.get('name')! });
        if (!product) {
          setResult({
            name: '',
            price: '',
            picture: '',
            revenuePerDay: 0,
            level: 0
          });
        }
        setResult(product);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchParams]);

  return (
    <div className='flex z-10 mt-3 w-full bg-mycolor-200 h-40 rounded-[2px] shadow-xl border-2 border-green-800 max-w-xs'>
      {result ? result.name : ''}
    </div>
  );
};

export default SearchResult;
