'use client';

import { getProduct } from '@/lib/actions/product';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SearchResult = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([
    {
      name: '',
      price: '',
      picture: '',
      revenuePerDay: 0,
      level: 0
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchParams.get('name') === null) return null;
        const product = await getProduct({ productName: searchParams.get('name')! });
        if (!product) {
          setResult([]);
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
    <div className='flex  mt-3 w-full bg-mycolor-200 rounded-[4px] z-50 p-2  shadow-xl border-2 max-w-xs'>
      <div className='flex flex-col items-center gap-4 justify-center w-full '>
        {result.length > 0
          ? result.map((item, index) => (
              <div key={index} className='flex justify-center items-center'>
                {item.name}
              </div>
            ))
          : 'Nothing Found'}
      </div>
    </div>
  );
};

export default SearchResult;
