'use client';

import { getUserByClerkId } from '@/lib/actions/user.action';
import React, { useEffect } from 'react';

interface Props {
  userId: string;
}

const ProductCard = ({ userId }: Props) => {
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getUserByClerkId(userId);
        if (!response) {
          return console.error('User not found');
        }
        setProducts(response.user.products);
        console.log(response.user.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [userId]);
  return (
    <div>
      {products.map((product) => (
        <div></div>
      ))}
    </div>
  );
};

export default ProductCard;
