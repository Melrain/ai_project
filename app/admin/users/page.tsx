import { columns } from '@/components/admin/table/columns';
import { DataTable } from '@/components/admin/table/data-table';
import { getAllUsers } from '@/lib/actions/user.action';

const page = async () => {
  const users = await getAllUsers();
  console.log(users);
  return (
    <div className='container mx-auto py-10 md:px-40 flex justify-center'>
      {/* <DataTable columns={columns} data={users} placeholder={'用户查找'} /> */}
    </div>
  );
};

export default page;
