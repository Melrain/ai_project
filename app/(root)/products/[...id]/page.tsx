import SingleProduct from '@/components/products/SingleProduct';
import React from 'react';

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    query: string;
  };
}
const page = async ({ params }: Props) => {
  console.log(params.id);
  return (
    <div className='flex justify-center flex-col items-center'>
      <SingleProduct productId={params.id} />
    </div>
  );
};

export default page;
