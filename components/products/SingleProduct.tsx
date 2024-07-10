'use client';

import { getProductById } from '@/lib/actions/product';
import React, { useEffect, useState } from 'react';
import Spinner from '../shared/Spinner';
import Image from 'next/image';
import { Separator } from '../ui/separator';

interface Props {
  productId: string;
}
const SingleProduct = ({ productId }: Props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [product, setProduct] = useState<any>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      setIsFetching(true);
      try {
        const product = await getProductById(productId);
        if (!product) {
          setProduct(null);
        }
        setProduct(product);
        console.log(product);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className='w-full flex'>
      {isFetching ? (
        <div className='flex mt-44 justify-center items-center'>
          <Spinner />
        </div>
      ) : (
        <div>
          {product ? (
            <div className='flex  flex-col justify-center items-center mt-10 w-full'>
              <Image src={product.picture} height={200} width={200} alt={product.name} />

              <Separator />
              <div className='bg-mycolor-100 flex w-full'>1</div>
            </div>
          ) : (
            <div>Not found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
