'use server';

import Product from '@/database/product';
import { User } from '@/database/user.model';

interface BuyProductParams {
  userId: string;
  productName: string;
  price: string;
  picture: string;
  revenuePerDay: number;
}

export const buyProduct = async (params: BuyProductParams) => {
  try {
    const { productName, price, picture, userId, revenuePerDay } = params;
    const product = await Product.create({
      productName,
      price,
      picture,
      ownerId: userId,
      revenuePerDay
    });
    if (!product) {
      throw new Error('Failed to buy product');
    }
    const updateData = { $inc: { level: 0.3 }, $push: { products: product._id } };
    const result = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!result) {
      throw new Error('Failed to update user');
    }
    return { message: 'Product bought successfully', product: product, result: result };
  } catch (error) {
    console.error(error);
  }
};
