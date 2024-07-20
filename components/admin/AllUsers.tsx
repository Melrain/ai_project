'use client';
import { getAllUsers } from '@/lib/actions/user.action';
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';

const AllUsers = () => {
  const [users, setUsers] = React.useState([]);
  const [searchParams, setSearchParams] = React.useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getAllUsers();
        if (!users) {
          throw new Error('No users found');
        }
        switch (searchParams) {
          case '':
            setUsers(users);
            break;

          default:
            break;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log(users);
  return (
    <div className='flex flex-row flex-wrap p-4 w-full justify-center items-center gap-2'>
      {users.map(
        (user: {
          level: number;
          balance: number;
          username: string;
          totalProfit: number;
          registeredAt: string;
          supervisor: {
            username: string;
          };
        }) => (
          <Card className='bg-gradient-to-tr from-blue-900 rounded-[8px] to-mycolor-300'>
            <CardHeader>
              <CardTitle>
                <Image
                  src='https://ipfs.filebase.io/ipfs/QmXi3t2k5Wbtt4M5ykvcAmFXwWzRjjVxxXVdPNfw8worKX'
                  alt='avatar'
                  width={20}
                  height={20}
                  className='rounded-full aspect-square object-cover w-[40px] h-[40px]'
                />
              </CardTitle>
              <CardDescription>{user.username}</CardDescription>
            </CardHeader>
            <CardContent className='text-sm flex flex-col gap-1'>
              <p>余额:{user.balance.toFixed(2)}</p>
              <p>利润:{user.totalProfit.toFixed(2)}</p>
              <p>上级:{user.supervisor.username}</p>
            </CardContent>
            <CardFooter className='flex flex-col gap-1'>
              <p className='text-xs text-slate-500'>Joined:{user.registeredAt.slice(0, 10)}</p>
              <Button className='rounded-[8px] mt-2'>点击修改</Button>
            </CardFooter>
          </Card>
        )
      )}
    </div>
  );
};

export default AllUsers;
