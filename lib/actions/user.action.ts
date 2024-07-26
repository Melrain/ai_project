'use server';

import { IUser, User } from '@/database/user.model';
import { connectToDatabase } from '../connectToDatabase';
import Product from '@/database/product';

export const getAllUsers = async () => {
  try {
    const users = await User.find();
    if (!users) {
      throw new Error('No users found');
    }
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error(error);
  }
};

export const getUserByClerkId = async (clerkId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: clerkId }).populate({
      path: 'products.product',
      model: Product
    });
    if (!user) {
      console.error('User not found');
    }
    const parsedUser = JSON.parse(JSON.stringify(user));
    return { message: 'User found', user: parsedUser };
  } catch (error) {
    console.error(error);
  }
};

export const getUserInfo = async (username: string) => {
  try {
    await connectToDatabase();
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
  type: string;
  state: string;
  clerkId: string;
  username: string;
  supervisor: {
    clerkId: string;
    username: string;
  };
  picture: string;
  topUpAmount: number;
  totalProfit: number;
  teamMembers: string[];
  invitedPeople: string[];
  firstTimeTopup: boolean;
  currentLoginIpAddress: string;
  level: number;
  exp: number;
  products: { product: string; createdAt: Date; updatedAt: Date }[];
  email: string;
  balance: number;
}
export const createUser = async (params: CreateUserParams) => {
  const {
    type,
    state,
    clerkId,
    username,
    supervisor,
    picture,
    topUpAmount,
    totalProfit,
    teamMembers,
    invitedPeople,
    firstTimeTopup,
    currentLoginIpAddress,
    level,
    exp,
    products,
    email,
    balance
  } = params;
  try {
    await connectToDatabase();
    const newUser = await User.create({
      type,
      state,
      clerkId,
      username,
      supervisor,
      picture,
      topUpAmount,
      totalProfit,
      teamMembers,
      invitedPeople,
      firstTimeTopup,
      currentLoginIpAddress,
      level,
      exp,
      products,
      email,
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
        clerkId: clerkId
      },
      updateData,
      { new: true }
    );
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }
    const parseUser = JSON.parse(JSON.stringify(updatedUser));
    return { message: 'User updated successfully', user: parseUser };
  } catch (error) {
    console.error(error);
  }
};

export const addBalanceAndTxId = async (clerkId: string, amount: number, txId: string) => {
  try {
    await connectToDatabase();
    const updateData = { $inc: { balance: amount, topUpAmount: amount }, $addToSet: { topUpTransactions: txId } };
    const updateResult = await User.findOneAndUpdate({ clerkId: clerkId }, updateData, { new: true });
    if (!updateResult) {
      throw new Error('Failed to update user');
    }
    const user = JSON.parse(JSON.stringify(updateResult));
    return { message: 'User balance and transaction id updated successfully', user: user };
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
