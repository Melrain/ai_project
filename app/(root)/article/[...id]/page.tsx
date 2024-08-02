import React from 'react';

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    query: string;
  };
}
const page = ({ params }: Props) => {
  return <div>{params.id}</div>;
};

export default page;
