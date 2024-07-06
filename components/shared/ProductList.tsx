'use client';

import { getAllProducts } from '@/lib/actions/product';
import React, { useEffect, useState } from 'react';
import { FilterIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '../ui/separator';

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
    <div className='flex flex-col gap-5 items-center w-full'>
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
      <div>
        {products.length > 1
          ? products.map((product) => (
              <div className='flex flex-row gap-5'>
                <div>Price:{product.price}</div>
                <div>Revenue:{product.revenuePerDay}</div>
                <div>LevelRequire:{product.levelRequirement}</div>
              </div>
            ))
          : 'Loading products...'}
      </div>
    </div>
  );
};

export default ProductList;
