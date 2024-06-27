import React from 'react';

interface Props {
  content: string;
  className: string;
}
const BorderMagicLabel = ({ content, className }: Props) => {
  return (
    <div
      className={` ${className} relative  inline-flex cursor-pointer h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50`}
    >
      <span className='absolute inset-[-1000%]  animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
      <span className='inline-flex h-full w-full cursor-pointer items-center justify-center   bg-slate-950 px-3 py-1 text-sm font-medium  backdrop-blur-3xl'>
        {content}
      </span>
    </div>
  );
};

export default BorderMagicLabel;
