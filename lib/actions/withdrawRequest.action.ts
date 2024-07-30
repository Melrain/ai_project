'use server';
import { WithdrawRequest } from '@/database/withdrawRequest';
import { connectToDatabase } from '../connectToDatabase';
import { User } from '@/database/user.model';

interface GetRequestWithUserIdParams {
  userId: string;
}

export const getRequestWithUserId = async (params: GetRequestWithUserIdParams) => {
  try {
    const { userId } = params;
    await connectToDatabase();
    const requests = await WithdrawRequest.find({ userId });
    if (!requests) {
      console.error('Error fetching withdraw requests');
    }
    return { message: 'Withdraw requests fetched successfully', data: JSON.parse(JSON.stringify(requests)) };
  } catch (error) {
    console.error(error);
  }
};

export const getAllWithdrawRequests = async () => {
  try {
    await connectToDatabase();
    const requests = await WithdrawRequest.find();
    if (!requests) {
      console.error('Error fetching withdraw requests');
    }
    return { message: 'Withdraw requests fetched successfully', data: JSON.parse(JSON.stringify(requests)) };
  } catch (error) {
    console.error(error);
  }
};
interface CreateWithdrawRequestParams {
  userId: string;
  amount: number;
  state: string;
}

export const createWithdrawRequest = async (params: CreateWithdrawRequestParams) => {
  try {
    const { userId, amount, state } = params;
    await connectToDatabase();
    const newRequest = await WithdrawRequest.create({ userId, amount, state });
    if (!newRequest) {
      console.error('Error creating withdraw request');
    }

    // update user balance

    const user = await User.findOneAndUpdate({ _id: userId }, { $inc: { balance: -amount } }, { new: true });
    if (!user) {
      console.error('Error updating user balance');
    }

    // insert transaction into user's withdrawRquests array
    await User.findOneAndUpdate(
      {
        _id: user._id
      },
      {
        $push: {
          withdrawRequests: {
            _id: newRequest._id
          }
        }
      }
    );

    return { message: 'Withdraw request created successfully', data: JSON.parse(JSON.stringify(newRequest)) };
  } catch {
    throw new Error('Error creating withdraw request');
  }
};
