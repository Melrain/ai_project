'use server';
import Transaction from '@/database/transaction';
import { connectToDatabase } from '../connectToDatabase';

interface CreateTransactionParams {
  type: string;
  clerkId: string;
  amount: number;
  status: string;
  transactionId: string;
}
export const createTransaction = async (params: CreateTransactionParams) => {
  try {
    const { type, clerkId, amount, status, transactionId } = params;
    await connectToDatabase();
    const transcation = await Transaction.create({
      type,
      clerkId,
      amount,
      status,
      transactionId
    });
    if (!transcation) {
      throw new Error('Transaction not created');
    }
    const parsedTransaction = JSON.parse(JSON.stringify(transcation));
    return { message: 'Transaction created successfully', parsedTransaction };
  } catch (error) {
    console.error(error);
  }
};
