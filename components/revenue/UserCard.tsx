'use client';
import React from 'react';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { CheckCheck, Copy, LinkIcon } from 'lucide-react';
import copy from 'copy-to-clipboard';

interface Props {
  username: string;
  userBalance: number;
  userLevel: number;
  userProductsLength: number;
}
const UserCard = ({ username, userBalance, userLevel, userProductsLength }: Props) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const onCopy = () => {
    setIsCopied(true);
    copy(`https://ai-project-jet.vercel.app/invite/${username}`);
  };

  return (
    <div className='w-full flex-col flex max-w-xs bg-gradient-to-br border-2  from-black via-mycolor-100 to-mycolor-200 shadow-lg rounded-[4px] p-3 gap-1 text-slate-400'>
      <div className='flex justify-between items-center w-full'>
        <Image
          src={'https://ipfs.filebase.io/ipfs/QmXi3t2k5Wbtt4M5ykvcAmFXwWzRjjVxxXVdPNfw8worKX'}
          width={40}
          height={40}
          alt='icon'
          className='rounded-full object-cover aspect-square border-2 border-green-800'
        />
        <AlertDialog>
          <AlertDialogTrigger>
            <LinkIcon className='text-green-500' />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>邀请链接</AlertDialogTitle>
              <AlertDialogDescription className='flex flex-col flex-wrap gap-3'>
                <div className='flex flex-row flex-wrap gap-1'>
                  <span>https://ai-project-jet.vercel.app/invite/{username}</span>
                  <Copy
                    onClick={() => {
                      onCopy();
                    }}
                    className={`${isCopied ? 'text-green-500' : ''} cursor-pointer`}
                  />
                  {isCopied && <CheckCheck className='text-green-500' />}
                </div>
                <div>
                  <Image
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ai-project-jet.vercel.app/invite/${username}`}
                    width={100}
                    height={100}
                    alt='qr'
                  />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className='flex justify-between w-full'>
        <span>{username}</span>
        <span>余额:${userBalance.toFixed(2)}</span>
      </div>
      <div className='flex justify-between w-full'>
        <span>VIP等级</span>
        <span>Lv:{userLevel}</span>
      </div>
      <div className='flex justify-between w-full'>
        <span>设备数量</span>
        <span>{userProductsLength}</span>
      </div>
    </div>
  );
};

export default UserCard;
