'use client';

import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getSortedRowModel,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Input } from '@/components/ui/input';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  placeholder: string;
  searchParams: string;
  mode: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  placeholder,
  searchParams,
  mode
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  const translateColumnsName = (name: string) => {
    switch (name) {
      case 'createdAt':
        return '创建时间';
      case 'amount':
        return '金额';
      case 'status':
        return '状态';
      case 'username':
        return '用户名称';
      case 'type':
        return '身份';
      case 'supervisor_username':
        return '上级';
      case 'teamMembers_length':
        return '团队人数';
      case 'invitedPeople_length':
        return '邀请认识';
      case 'level':
        return '等级';
      case 'products_length':
        return '产品数量';
      case 'investedAmount':
        return '投资金额';
      case 'topUpAmount':
        return '充值金额';
      case 'totalProfit':
        return '总收益';
      case 'balance':
        return '余额';
      case 'exp':
        return '经验值';
      case 'actions':
        return '操作';
      default:
        return name;
    }
  };

  return (
    <div className='w-full  '>
      <div className='flex items-center py-4'>
        <Input
          placeholder={placeholder}
          value={(table.getColumn(searchParams)?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn(searchParams)?.setFilterValue(event.target.value)}
          className={` max-w-sm ${mode === 'dark' ? '' : 'bg-white'} `}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className={`ml-auto ${mode === 'dark' ? '' : 'bg-white'}`}>
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className={`${mode === 'dark'}?'':'bg-white'`}>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {translateColumnsName(column.id)}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          className={`${mode === 'dark' ? '' : 'bg-white'}`}
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          className={`${mode === 'dark' ? '' : 'bg-white'}`}
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <div className='flex-1 text-sm text-muted-foreground'>
        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  );
}
