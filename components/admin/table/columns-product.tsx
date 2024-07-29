'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { deleteProductById } from '@/lib/actions/product.action';
import { IProduct } from '@/database/product';

export const columnsProduct: ColumnDef<IProduct>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'productId',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ID
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          产品名称
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          类型
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          价格
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'revenuePerDay',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          每日收益
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'levelRequirement',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          等级要求
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'expOnPurchase',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          经验值
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'order',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          排列顺序
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'state',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          状态
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='bg-white text-black'>
            <DropdownMenuLabel className='text-slate-500'>操作</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(`http://localhost:3000/products/${product._id}`)}
            >
              复制产品链接
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                window.location.href = `/console/products/${product._id}`;
              }}
            >
              修改产品
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-red-500'
              onClick={async () => {
                try {
                  console.log(typeof product._id);
                  if (!product._id) return;
                  await deleteProductById(product._id as string);
                } catch (error) {
                  console.error(error);
                } finally {
                  if (typeof window !== 'undefined') {
                    window.location.reload();
                  }
                }
              }}
            >
              删除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
