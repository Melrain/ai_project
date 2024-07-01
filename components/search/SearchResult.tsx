'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const SearchResult = () => {
  const searchParams = useSearchParams();

  console.log('serchResult:', searchParams);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  return <div className='w-full flex justify-center items-center'>TopMatch</div>;
};

export default SearchResult;
