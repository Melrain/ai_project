import EditProduct from '@/components/console/EditProduct';
import { getProductById } from '@/lib/actions/product.action';
import { Database } from 'lucide-react';
import React from 'react';
import { ZCOOL_XiaoWei } from 'next/font/google';
interface Props {
  params: {
    id: string;
  };
}
const zcoolFont = ZCOOL_XiaoWei({
  weight: ['400'],
  subsets: ['latin']
});
const page = async ({ params }: Props) => {
  const products = await getProductById(params.id);
  if (!products) {
    return <div>产品不存在</div>;
  }
  return (
    <div className={`flex flex-col w-full h-screen`}>
      <div className='flex flex-row items-center px-2 '>
        <Database />
        <h1 className={`text-xl px-2 ${zcoolFont.className}`}>修改产品</h1>
      </div>
      <EditProduct productId={params.id} />
    </div>
  );
};

export default page;
