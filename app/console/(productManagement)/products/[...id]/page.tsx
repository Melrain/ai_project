import EditProduct from '@/components/console/EditProduct';
import { getProductById } from '@/lib/actions/product.action';
import React from 'react';
interface Props {
  params: {
    id: string;
  };
}
const page = async ({ params }: Props) => {
  const products = await getProductById(params.id);
  if (!products) {
    return <div>产品不存在</div>;
  }
  return (
    <div>
      <EditProduct productId={params.id} />
    </div>
  );
};

export default page;
