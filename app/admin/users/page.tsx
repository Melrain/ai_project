import { Payment, columns } from '@/components/admin/table/cloumns';
import { DataTable } from '@/components/admin/table/data-table';
import { getAllUsers } from '@/lib/actions/user.action';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com'
    },
    {
      id: '728e222f',
      amount: 90,
      status: 'pending',
      email: 'm@exam123ple.com'
    }
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className='container mx-auto py-10 max-w-xl flex justify-center'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
