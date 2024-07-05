'use client';

import { SearchIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import SearchResult from './SearchResult';

const ProductSearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null);

  const query = searchParams.get('q');

  const [search, setSearch] = useState(query || '');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch('');
      }
    };

    setIsOpen(false);

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'name',
          value: search
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['name', 'level']
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router, pathname, searchParams, query]);
  return (
    <div className='flex justify-center '>
      <div className='flex relative max-w-xs justify-center w-full items-center'>
        <SearchIcon className='absolute right-2 text-slate-500' />
        <div className='max-w-xs w-full p-2'>
          <Input
            className='text-[16px]'
            ref={searchContainerRef}
            placeholder='search product...'
            type='text'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (!isOpen) setIsOpen(true);
              if (e.target.value === '' && isOpen) setIsOpen(false);
            }}
          />
        </div>
      </div>
      <div className='absolute max-w-xs w-full top-44'>{isOpen && <SearchResult />}</div>
    </div>
  );
};

export default ProductSearchBar;
