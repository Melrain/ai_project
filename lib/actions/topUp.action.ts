'use server';

import Transaction from '@/database/transactions';
import { connectToDatabase } from '../connectToDatabase';
import { updateUser, updateUserBalance } from './user.action';

interface CreateTopUpProps {
  userId: string;
  amount: number;
  state: string;
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const createTopUpTransaction = async ({ userId, amount }: CreateTopUpProps) => {
  try {
    await connectToDatabase();
    const transaction = await Transaction.create({
      userId,
      amount,
      status: 'pending',
      transactionId: '001'
    });

    if (!transaction) {
      throw new Error('Failed to create transaction');
    }

    if (transaction.status !== 'complete') {
      return { message: 'Transaction is still pending, please wait' };
    }
    const result = await updateUserBalance(userId, amount);
    if (!result) {
      throw new Error('Failed to update balance');
    }
  } catch (error) {
    console.error(error);
  }
};
