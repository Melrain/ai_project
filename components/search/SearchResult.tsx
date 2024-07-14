'use client';

import { getProduct } from '@/lib/actions/product.action';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Spinner from '../shared/Spinner';
import Image from 'next/image';
import Link from 'next/link';

const SearchResult = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([
    {
      _id: '',
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
        setIsLoading(true);
        if (searchParams.get('name') === null) return null;
        const product = await getProduct({ productName: searchParams.get('name')! });
        if (!product) {
          setResult([]);
        }
        setResult(product);
        console.log(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchParams]);

  return (
    <div className='flex  mt-3 w-full bg-mycolor-100 rounded-[4px] z-50 p-2  shadow-xl border-2 max-w-xs'>
      <div className='flex flex-col items-center gap-4 justify-center w-full '>
        {isLoading && (
          <div>
            <Spinner />
          </div>
        )}
        {result.length > 0
          ? result.map((item, index) => (
              <Link href={`/products/${item._id}`}>
                <div key={index} className='flex flex-row gap-2 items-center'>
                  <Image src={item.picture} width={20} height={20} alt={item.name} />
                  <span>{item.name}</span>
                </div>
              </Link>
            ))
          : 'Nothing Found'}
      </div>
    </div>
  );
};

export default SearchResult;
