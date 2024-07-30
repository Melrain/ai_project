import { WithdrawRequest } from '@/database/withdrawRequest';
import { connectToDatabase } from '../connectToDatabase';

interface CreateWithdrawRequestParams {
  userId: string;
  amount: number;
}

export const CreateWithdrawRequest = async (params: CreateWithdrawRequestParams) => {
  try {
    const { userId, amount } = params;
    await connectToDatabase();
    const newRequest = await WithdrawRequest.create({ userId, amount });
    if (!newRequest) {
      console.error('Error creating withdraw request');
    }
    return { message: 'Withdraw request created successfully', data: newRequest };
  } catch {
    throw new Error('Error creating withdraw request');
  }
};
