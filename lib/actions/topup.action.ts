'use server';

import TopupTransaction from '@/database/topupTransaction';
import { connectToDatabase } from '../connectToDatabase';
import { User } from '@/database/user.model';

interface CreateTopupTransactionParams {
  type: string;
  mongoUserId: string;
  isFirstTopup: boolean;
  amount: number;
  status: string;
}

export const createTopupTransaction = async (params: CreateTopupTransactionParams) => {
  try {
    const { type, mongoUserId, isFirstTopup, amount, status } = params;
    await connectToDatabase();
    const transaction = await TopupTransaction.create({
      type,
      mongoUserId,
      isFirstTopup,
      amount,
      status
    });
    if (!transaction) {
      throw new Error('Failed to create topup transaction');
    }
    const updateData = {
      $inc: { balance: amount, topUpAmount: amount },
      $addToSet: { topupTransactions: transaction._id }
    };

    const updatedUser = await User.findOneAndUpdate({ _id: mongoUserId }, updateData, { new: true });
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }

    //set transaction's status to success
    transaction.status = 'success';
    await transaction.save();

    return { message: 'Topup transaction created successfully', transaction, user: updatedUser };

    // update user's balance and add transaction id to user's topupTransactions
  } catch (error) {
    console.error(error);
  }
};
