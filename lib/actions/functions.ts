'use server';

import { connectToDatabase } from '../connectToDatabase';
import { getProductById } from './product.action';
import { getUserByClerkId } from './user.action';

interface calculateProfitParams {
  userId: string;
  productId: string;
}

//TODO - populate user's products

export const calculateProfit = async (params: calculateProfitParams) => {
  try {
    await connectToDatabase();
    const { userId, productId } = params;
    const userReponse = await getUserByClerkId(userId);
    if (!userReponse) {
      return console.error('User not found');
    }
    console.log(userReponse.user.products[0]);
    //TODO 完成populate
    const user = userReponse.user;
    if (!user.products.some((product: { id: string }) => product.id === productId)) {
      return console.error('user does not have this product');
    }
    console.log(user);
    const product = user.products.find((product: { id: string }) => product.id === productId);
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

    console.log(timeDifferenceInHours);
  } catch (error) {
    console.error(error);
  }
};
