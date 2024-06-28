'use client';
import React from 'react';

interface Props {
  transactions: [];
}

const TransactionList = ({ transactions }: Props) => {
  return (
    <div>
      {transactions.map((transaction: [string]) => {
        return <div>{transaction}</div>;
      })}
    </div>
  );
};

export default TransactionList;
