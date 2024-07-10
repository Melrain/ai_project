'use client';

import { getAllProducts } from '@/lib/actions/product';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Computer, FilterIcon, Tag } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '../ui/separator';
import Spinner from './Spinner';
import Link from 'next/link';
import { IconCashRegister, IconVip } from '@tabler/icons-react';

interface ProductType {
  _id: string;
  name: string;
  price: number;
  picture: string;
  revenuePerDay: number;
  levelRequirement: number;
}

const ProductList = () => {
  const [isSelected, setIsSelected] = useState('');
  const [filter, setFilter] = useState('createdAt');
  const [order, setOrder] = useState(-1);
  const [products, setProducts] = useState([] as ProductType[]);

  const onClick = (name: string) => {
    setIsSelected(name);
    switch (name) {
      case 'Newest':
        setFilter('createdAt');
        setOrder(-1);
        break;
      case 'Price Up':
        setFilter('price');
        setOrder(1);
        break;
      case 'Price Down':
        setFilter('price');
        setOrder(-1);
        break;
      case 'Revenue':
        setFilter('revenuePerDay');
        setOrder(-1);
        break;
      case 'Level Up':
        setFilter('levelRequirement');
        setOrder(1);
        break;
      case 'Level Down':
        setFilter('levelRequirement');
        setOrder(-1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await getAllProducts({ filter: filter, order: order });
        if (!products) {
          return <div>NO PRODUCTS FOUND!</div>;
        }
        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, [filter, order]);
  return (
    <div className='flex flex-col gap-5 items-center w-full bg-black'>
      <div className='flex w-full flex-row gap-2 items-end justify-end'>
        <h1 className='text-slate-500'>Filter {filter}</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className=' outline-none border-none'>
            <FilterIcon className='text-slate-500' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                onClick('Newest');
              }}
            >
              Newest
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                onClick('Price Up');
              }}
            >
              Price Up
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                onClick('Price Down');
              }}
            >
              Price Down
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                onClick('Revenue');
              }}
            >
              Revenue
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                onClick('Level Up');
              }}
            >
              Level Up
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                onClick('Level Down');
              }}
            >
              Level Down
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />

      <div className=''>
        <ScrollArea className='sm:w-full sm:max-w-xl w-96 whitespace-nowrap   rounded-md  border-none'>
          <div className='flex w-full space-x-4 p-4 bg-grid-small-white/[0.2] justify-center items-center'>
            {products.length > 0 ? (
              products.map((product) => (
                <Link href={`/products/${product._id}`} className=''>
                  <div key={product.name} className='shrink-0   flex-col justify-center items-center flex '>
                    <div className='overflow-hidden rounded-md flex-col flex justify-center items-center h-[400px] w-[300px]'>
                      <Image
                        src={product.picture}
                        alt={`Photo by ${product.name}`}
                        className='aspect-[3/4] p-2 object-center rounded-[3px]'
                        width={300}
                        height={400}
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    </div>

                    <div className='pt-2 text-xs text-muted-foreground flex gap-2  justify-center flex-col items-start  '>
                      <span className='text-sm text-center w-full font-bold -mt-6'>点击查看</span>
                      <span className='font-semibold text-foreground text-xl flex flex-row gap-1 items-center'>
                        <Computer className='text-slate-500' /> 产品:
                        <span className='text-green-500'>{product.name}</span>
                      </span>
                      <span className='font-semibold text-foreground text-xl flex flex-row gap-1 items-center'>
                        <IconVip className='text-slate-500' /> 购买资质:
                        <span className='text-green-500'>Lv {product.levelRequirement}</span>
                      </span>
                      <span className='font-semibold text-foreground text-xl flex flex-row gap-1 items-center'>
                        <Tag className='text-slate-500' /> 价格:
                        <span className='text-green-500'>${product.price}</span>
                      </span>
                      <span className='font-semibold text-foreground text-xl flex flex-row gap-1 items-center'>
                        <IconCashRegister className='text-slate-500' /> 每日收益:
                        <span className='text-green-500'>{product.revenuePerDay}/天</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className='z-20 w-full justify-center items-center flex'>
                <Spinner />
              </div>
            )}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </div>
  );
};

export default ProductList;
