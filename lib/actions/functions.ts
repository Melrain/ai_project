'use server';

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
    console.log('userId', userId, 'productId', productId);
    const userReponse = await getUserByClerkId(userId);
    if (!userReponse) {
      return console.error('User not found');
    }

    const user = userReponse.user;
    if (!user.products.some((p: { product: { _id: string } }) => p.product._id === productId)) {
      return console.error('user does not have this product');
    }
    console.log(user);
    const product = user.products.find((p: { product: { _id: string } }) => p.product._id === productId);
    if (!product) {
      return console.error('Product not found');
    }
    console.log(product);

    //calculate time difference
    const currentDate = new Date();
    const productDate = new Date(product.updatedAt);

    // Calculate the difference in milliseconds between the two times
    const timeDifferenceInMs = currentDate.getTime() - productDate.getTime();

    // Convert the difference to hours
    const timeDifferenceInHours = timeDifferenceInMs / (1000 * 60 * 60);
    const timeDifferenceInMinutes = timeDifferenceInMs / (1000 * 60);
    const timeDifferenceInSeconds = timeDifferenceInMs / 1000;
    console.log(timeDifferenceInSeconds, timeDifferenceInMinutes, timeDifferenceInHours);
    const profitPerMinute = (product.product.revenuePerDay / (24 * 60)).toFixed(6);
    const profitPerHour = (product.product.revenuePerDay / 24).toFixed(6);
    const profitPerSecond = (product.product.revenuePerDay / (24 * 60 * 60)).toFixed(6);

    return {
      timeDifferenceInSeconds,
      timeDifferenceInMinutes,
      timeDifferenceInHours,
      profitPerSecond,
      profitPerMinute,
      profitPerHour
    };
  } catch (error) {
    console.error(error);
  }
};
