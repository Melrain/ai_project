'use server';

import { User } from '@/database/user.model';
import { connectToDatabase } from '../connectToDatabase';
import { getUserByClerkId } from './user.action';

interface calculateProfitParams {
  userId: string;
  productId: string;
}

export const calculateProfit = async (params: calculateProfitParams) => {
  try {
    await connectToDatabase();
    const { userId, productId } = params;
    const userReponse = await getUserByClerkId(userId);
    if (!userReponse) {
      return console.error('User not found');
    }

    const user = userReponse.user;
    if (!user.products.some((p: { product: { _id: string } }) => p.product._id === productId)) {
      return console.error('user does not have this product');
    }

    const product = user.products.find((p: { product: { _id: string } }) => p.product._id === productId);
    if (!product) {
      return console.error('Product not found');
    }

    //calculate time difference
    const currentDate = new Date();
    const productDate = new Date(product.updatedAt);

    // Calculate the difference in milliseconds between the two times
    const timeDifferenceInMs = currentDate.getTime() - productDate.getTime();

    // Convert the difference to hours
    const timeDifferenceInHours = timeDifferenceInMs / (1000 * 60 * 60);
    const timeDifferenceInMinutes = timeDifferenceInMs / (1000 * 60);
    const timeDifferenceInSeconds = timeDifferenceInMs / 1000;
    const profitPerMinute = (product.product.revenuePerDay / (24 * 60)).toFixed(6);
    const profitPerHour = (product.product.revenuePerDay / 24).toFixed(6);
    const profitPerSecond = Number((product.product.revenuePerDay / (24 * 60 * 60)).toFixed(6));

    // calculate profit
    const currentProfit = (profitPerSecond * timeDifferenceInSeconds).toFixed(5);

    return JSON.parse(
      JSON.stringify({
        timeDifferenceInSeconds,
        timeDifferenceInMinutes,
        timeDifferenceInHours,
        profitPerSecond,
        profitPerMinute,
        profitPerHour,
        currentProfit
      })
    );
  } catch (error) {
    console.error(error);
  }
};

interface UserCollectProfit {
  userId: string;
  productId: string;
}
export const userCollectProfit = async (params: UserCollectProfit) => {
  try {
    await connectToDatabase();
    const { userId, productId } = params;
    const profitResponse = await calculateProfit({ userId, productId });
    if (!profitResponse) {
      return console.error('profit not found 1001');
    }
    const profit = profitResponse.currentProfit;

    const userResponse = await getUserByClerkId(userId);
    if (!userResponse) {
      return console.error('User not found');
    }
    const user = userResponse.user;
    if (!user.products.some((p: { product: { _id: string } }) => p.product._id === productId)) {
      return console.error('user does not have this product');
    }
    const product = user.products.find((p: { product: { _id: string } }) => p.product._id === productId);
    if (!product) {
      return console.error('Product not found');
    }
    const newProduct = {
      ...product,
      updatedAt: new Date()
    };
    const newProducts = user.products.map((p: { product: { _id: string } }) => {
      if (p.product._id === productId) {
        return newProduct;
      }
      return p;
    });
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },

      {
        $inc: { balance: profit },
        products: newProducts
      },
      { new: true }
    );
    return JSON.parse(
      JSON.stringify({
        user: updatedUser,
        profit
      })
    );
  } catch (error) {
    console.error(error);
  }
};
