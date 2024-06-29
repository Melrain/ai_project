'use server';
import Transaction from '@/database/transaction';
import { connectToDatabase } from '../connectToDatabase';

interface CreateTransactionParams {
  type: string;
  userId: string;
  amount: number;
  status: string;
  transactionId: string;
}
export const createTransaction = async (params: CreateTransactionParams) => {
  try {
    const { type, userId, amount, status, transactionId } = params;
    await connectToDatabase();
    const transcation = await Transaction.create({
      type,
      userId,
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

interface GetUserTransactionsProps {
  userId: string;
}
export const getUserTransactions = async (params: GetUserTransactionsProps) => {
  const { userId } = params;
  try {
    await connectToDatabase();
    const transactions = await Transaction.find({ userId: userId }).sort({ createdAt: -1 });
    if (!transactions) {
      console.log('Transactions not found');
    }

    const parsedData = JSON.parse(JSON.stringify(transactions));

    return { message: 'Transactions found', transactions: parsedData };
  } catch (error) {
    console.error(error);
  }
};
