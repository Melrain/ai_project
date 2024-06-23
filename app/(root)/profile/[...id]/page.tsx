import React from 'react';

interface Props {
  params: {
    id: string;
  };
}
const page = ({ params }: Props) => {
  console.log(params);
  return <div>{params.id}</div>;
};

export default page;
