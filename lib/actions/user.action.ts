'use server';

import { IUser, User } from '@/database/user.model';
import { connectToDatabase } from '../connectToDatabase';

export const getUserInfo = async (username: string) => {
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new Error('User not found');
    }
    const parsedUser = JSON.parse(JSON.stringify(user));
    return { message: 'User found', user: parsedUser };
  } catch (error) {
    console.error(error);
  }
};
interface CreateUserParams {
  clerkId: string;
  email: string;
  username: string;
  supervisor: {
    clerkId: string;
    username: string;
  };
  balance: number;
}
export const createUser = async (params: CreateUserParams) => {
  const { clerkId, username, supervisor, email, balance } = params;
  try {
    await connectToDatabase();
    const newUser = await User.create({
      clerkId,
      username,
      supervisor,
      balance,
      email
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

export const addSupervisor = async (
  clerkId: string,
  supervisor: {
    clerkId: string;
    username: string;
  }
) => {
  try {
    await connectToDatabase();
    const updateData = { supervisor: supervisor };
    const updatedUser = await User.findOneAndUpdate(
      {
        clerkId: clerkId
      },
      updateData,
      { new: true }
    );
    if (!updatedUser) {
      throw new Error('Failed to add supervisor');
    }
    const parsedUser = JSON.parse(JSON.stringify(updatedUser));
    return { message: 'Supervisor added successfully', user: parsedUser };
  } catch (error) {
    console.error(error);
  }
};
