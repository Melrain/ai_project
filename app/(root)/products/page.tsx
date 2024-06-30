import React from 'react';

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

const page = ({ searchParams }: SearchParamsProps) => {
  console.log(searchParams);
  return <div className=''></div>;
};

export default page;
