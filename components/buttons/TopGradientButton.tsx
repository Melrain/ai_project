import React from 'react';

interface Props {
  content: string;
  icon?: React.ReactNode;
}

const TopGradientButton = ({ content, icon }: Props) => {
  return (
    <button className='px-4 py-2 rounded-full relative bg-slate-900 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600'>
      <div className='absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent' />
      <span className='relative z-20 gap-1 flex flex-row justify-center items-center'>
        {icon}
        {content}
      </span>
    </button>
  );
};

export default TopGradientButton;
