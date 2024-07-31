import { DataTable } from '@/components/admin/table/data-table';
import React from 'react';
import { columns } from '@/components/admin/table/columns';
import { getAllUsers } from '@/lib/actions/user.action';

const page = async () => {
  const users = await getAllUsers();
  if (!users) {
    return <div>用户不存在</div>;
  }
  return (
    <div className='w-full flex px-10'>
      <DataTable columns={columns} data={users} placeholder={'输入名字查询'} searchParams={'username'} mode={'white'} />
    </div>
  );
};

export default page;
