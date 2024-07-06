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
  console.log(params.id);
  return <div className='flex justify-center flex-col items-center'>{params.id}</div>;
};

export default page;
