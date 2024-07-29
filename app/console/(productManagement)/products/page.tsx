import { DataTable } from '@/components/admin/table/data-table';
import React from 'react';
import { columnsProduct } from '@/components/admin/table/columns-product';
import { getAllProductsClean } from '@/lib/actions/product.action';

const page = async () => {
  const products = await getAllProductsClean();
  console.log(products);
  return (
    <div className='w-full px-10'>
      <DataTable columns={columnsProduct} data={products} placeholder={'产品名称查找...'} />
    </div>
  );
};

export default page;
