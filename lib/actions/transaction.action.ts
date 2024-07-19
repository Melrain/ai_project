'use server';
import Transaction from '@/database/transaction';
import { connectToDatabase } from '../connectToDatabase';
import Product from '@/database/product';

interface CreateTransactionParams {
  type: string;
  userId: string;
  amount: number;
  status: string;
  notes?: {
    name: string;
    id: string;
  };
}
export const createTransaction = async (params: CreateTransactionParams) => {
  try {
    const { type, userId, amount, status, notes } = params;
    await connectToDatabase();
    const transcation = await Transaction.create({
      type,
      userId,
      amount,
      status,
      notes: notes ? notes : null
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
    const transactions = await Transaction.find({ userId: userId })
      .populate({ path: 'notes.id', model: Product })
      .sort({ createdAt: -1 });
    if (!transactions) {
      console.log('Transactions not found');
    }
    console.log(transactions);
    const parsedData = JSON.parse(JSON.stringify(transactions));

    return { message: 'Transactions found', transactions: parsedData };
  } catch (error) {
    console.error(error);
  }
};

interface GetAllTransactionsParams {
  date: string;
}
export const getAllTransactions = async () => {
  try {
    await connectToDatabase();
    const transactions = await Transaction.find({}).sort({ createdAt: -1 });
    if (!transactions) {
      console.log('Transactions not found');
    }
    return JSON.parse(JSON.stringify(transactions));
  } catch (error) {
    console.error(error);
  }
};
