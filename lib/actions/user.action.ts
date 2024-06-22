'use server';

import { User } from '@/database/user.model';
import { connectToDatabase } from '../connectToDatabase';

interface CreateUserParams {
  username: string;
  first_name: string;
  last_name: string;
  phone: {
    number: string;
    verified: boolean;
  };
  inviteLink: string;
  supervisor: string;
  balance: number;
}
export const CreateUser = async (params: CreateUserParams) => {
  const { username, first_name, last_name, phone, inviteLink, supervisor, balance } = params;
  try {
    await connectToDatabase();
    const newUser = await User.create({
      username,
      first_name,
      last_name,
      phone,
      inviteLink,
      supervisor,
      balance
    });
    if (!newUser) {
      throw new Error('Failed to create user');
    }
    return { message: 'User created successfully', user: newUser };
  } catch (error) {
    console.error(error);
  }
};
