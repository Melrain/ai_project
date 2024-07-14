'use client';

import React from 'react';

interface Props {
  userId: string;
}

const ProductCard = ({ userId }: Props) => {
  return <div>{userId}</div>;
};

export default ProductCard;
