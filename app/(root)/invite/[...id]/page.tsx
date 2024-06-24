import React from 'react';

interface Props {
  params: {
    id: string;
  };
}
const page = ({ params }: Props) => {
  console.log(params.id);
  return <div>page</div>;
};

export default page;
