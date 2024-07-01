'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SearchResult = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (error) {
        console.error(error);
      }
    };
  }, [searchParams]);

  return (
    <div className='flex z-10 mt-3 w-full bg-mycolor-200 h-40 rounded-[2px] shadow-xl border-2 border-green-800 max-w-xs'>
      {searchParams.get('name')}
    </div>
  );
};

export default SearchResult;
