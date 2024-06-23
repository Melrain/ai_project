'use server';

import { IUser, User } from '@/database/user.model';
import { connectToDatabase } from '../connectToDatabase';

interface CreateUserParams {
  clerkId: string;
  email: string;
  username: string;
  phone?: string;
  inviteLink: string;
  supervisor: string;
  balance: number;
}
export const createUser = async (params: CreateUserParams) => {
  const { clerkId, username, phone, inviteLink, supervisor, balance } = params;
  try {
    await connectToDatabase();
    const newUser = await User.create({
      clerkId,
      username,
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

interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
}
export const updateUser = async (params: UpdateUserParams) => {
  const { clerkId, updateData } = params;
  try {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate(
      {
        clerkId: clerkId,
        updateData: updateData
      },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }
    return { message: 'User updated successfully', user: updatedUser };
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase();
    const deletedUser = await User.findOneAndDelete({ clerkId: clerkId });
    if (!deletedUser) {
      throw new Error('Failed to delete user');
    }
    return { message: 'User deleted successfully', user: deletedUser };
  } catch (error) {
    console.error(error);
  }
};
