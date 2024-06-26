import React from 'react';

interface Props {
  content: string;
  icon: React.ReactNode;
}
const LitUpBorderButton = ({ content, icon }: Props) => {
  return (
    <button className='p-[3px] relative'>
      <div className='absolute  inset-0 bg-gradient-to-r from-indigo-700 to-blue-800 rounded-full' />
      <div className='px-4 py-2 rounded-lg  relative group transition flex flex-row duration-200 font-bold justify-between gap-2 text-white bg-transparent'>
        {icon} {content}
      </div>
    </button>
  );
};

export default LitUpBorderButton;
