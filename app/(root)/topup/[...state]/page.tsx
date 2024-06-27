import React from 'react';

interface Props {
  params: {
    state: string;
  };
}

const page = ({ params }: Props) => {
  console.log(params.state);
  return <div>page</div>;
};

export default page;
