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
import { IUser } from '@/database/user.model';

export const columns: ColumnDef<IUser>[] = [
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
    accessorKey: 'username',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          用户名
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
          身份
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'supervisor.username',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          上级
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'teamMembers.length',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          团队人数
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'invitedPeople.length',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          已招募人数
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'level',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          等级
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'products.length',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          设备数量
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'investedAmount',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          投资金额
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },

  {
    accessorKey: 'topUpAmount',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          充值金额
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'totalProfit',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          总收益
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          余额
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'exp',
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
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel className='text-slate-500'>操作</DropdownMenuLabel>

            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.username)}>复制用户名</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                console.log(user._id);
              }}
            >
              改变身份:员工
            </DropdownMenuItem>
            <DropdownMenuItem>改变身份:用户</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
