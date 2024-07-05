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

const ProductList = () => {
  const [isSelected, setIsSelected] = useState('');
  const [filter, setFilter] = useState('createdAt');
  const [order, setOrder] = useState(-1);
  const [products, setProducts] = useState([
    {
      _id: '',
      name: '',
      price: 0,
      picture: '',
      revenuePerDay: 0
    }
  ]);

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
          <DropdownMenuTrigger>
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      <div>
        {products.map((product) => (
          <div className='flex flex-row gap-5'>
            <div>Price:{product.price}</div>
            <div>Revenue:{product.revenuePerDay}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
