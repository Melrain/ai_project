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
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          创建时间
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },

  {
    accessorKey: 'amount',
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
