import React from 'react';

interface Props {
  content: string;
  icon?: React.ReactNode;
}
const SpotifyButton = ({ content, icon }: Props) => {
  return (
    <div>
      <button className='px-4 py-2 rounded-[3px] flex flex-row items-center justify-center bg-[#1ED760] font-bold text-white tracking-widest  transform hover:scale-105 hover:bg-[#21e065] transition-colors duration-200 gap-1'>
        {icon}
        {content}
      </button>
    </div>
  );
};

export default SpotifyButton;
