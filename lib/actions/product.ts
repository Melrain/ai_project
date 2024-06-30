'use server';

import Product from '@/database/product';
import { User } from '@/database/user.model';
import { connectToDatabase } from '../connectToDatabase';
import { getUserByClerkId } from './user.action';

interface BuyProductParams {
  userId: string;
  productName: string;
  price: string;
  picture: string;
  revenuePerDay: number;
}

//TODO 无法减少Balance; 然后数据格式需要处理;
export const buyProduct = async (params: BuyProductParams) => {
  try {
    const { productName, price, picture, userId, revenuePerDay } = params;
    await connectToDatabase();
    console.log('userId:', userId);
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return { code: 404, message: 'User not found' };
    }
    const userResult = JSON.parse(JSON.stringify(user));
    if (userResult.balance < price) {
      return { code: 808, message: 'Insufficient balance', balance: userResult.balance };
    }
    const product = await Product.create({
      name: productName,
      price: price,
      picture: picture,
      ownerId: userId,
      revenuePerDay: revenuePerDay
    });
    if (!product) {
      throw new Error('Failed to buy product');
    }
    const updateData = { $inc: { level: 0.3 }, $push: { products: product._id }, $dec: { balance: price } };
    const result = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!result) {
      throw new Error('Failed to update user');
    }

    return {
      code: 200,
      message: 'Product bought successfully',
      product: product,
      result: JSON.parse(JSON.stringify(result))
    };
  } catch (error) {
    console.error(error);
  }
};
