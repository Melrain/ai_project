'use server';

import Product, { IProduct } from '@/database/product';
import { User } from '@/database/user.model';
import { connectToDatabase } from '../connectToDatabase';
import { getUserByClerkId, updateUser } from './user.action';

interface BuyProductParams {
  userId: string;
  productName: string;
  price: string;
  picture: string;
  revenuePerDay: number;
}

// export const buyProduct = async (params: BuyProductParams) => {
//   try {
//     const { productName, price, picture, userId, revenuePerDay } = params;
//     await connectToDatabase();

//     const user = await User.findOne({ _id: userId });
//     if (!user) {
//       return { code: 404, message: 'User not found' };
//     }
//     const userResult = JSON.parse(JSON.stringify(user));
//     if (userResult.balance < price) {
//       return { code: 808, message: 'Insufficient balance', balance: userResult.balance };
//     }
//     const product = await Product.create({
//       name: productName,
//       price: price,
//       picture: picture,
//       ownerId: userId,
//       revenuePerDay: revenuePerDay
//     });
//     if (!product) {
//       throw new Error('Failed to buy product');
//     }
//     const updateData = { $inc: { level: 0.3, balance: -price }, $push: { products: product._id } };
//     const result = await User.findByIdAndUpdate(userId, updateData, { new: true });
//     if (!result) {
//       throw new Error('Failed to update user');
//     }
//     const parsedProduct = JSON.parse(JSON.stringify(product));
//     const parsedResult = JSON.parse(JSON.stringify(result));
//     return {
//       code: 200,
//       message: 'Product bought successfully',
//       product: parsedProduct,
//       result: parsedResult
//     };
//   } catch (error) {
//     console.error(error);
//   }
// };

//create product
interface CreateProductProps {
  productName: string;
  price: string;
  picture: string;
  revenuePerDay: number;
  passcode: number;
}
export const createProduct = async (params: CreateProductProps) => {
  try {
    const { passcode, productName, price, picture, revenuePerDay } = params;
    await connectToDatabase();
    if (passcode !== 198900) {
      return { code: 404, message: 'You are not admin' };
    }
    const product = await Product.create({
      name: productName,
      price: price,
      picture: picture,
      users: [],
      revenuePerDay: revenuePerDay
    });
    if (!product) {
      return { code: 404, message: 'Failed to create product' };
    }
    const parsedProduct = JSON.parse(JSON.stringify(product));
    return { code: 200, message: 'Product created successfully', product: parsedProduct };
  } catch (error) {
    console.error(error);
  }
};

//update product info
// interface UpdateProductProps {
//   productId: string;
//   updateData: Partial<IProduct>;
// }
// export const updateProduct = async (params: UpdateProductProps) => {
//   try {
//     const { productId, updateData } = params;
//     await connectToDatabase();
//     const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
//     if (!product) {
//       return { code: 404, message: 'Product not found' };
//     }
//     const parsedProduct = JSON.parse(JSON.stringify(product));
//     return { code: 200, message: 'Product updated successfully', product: parsedProduct };
//   } catch (error) {
//     console.error(error);
//   }
// };

//user buy product
interface BuyProductProps {
  userClerkId: string;
  productId: string;
}
export const buyProduct = async (params: BuyProductProps) => {
  try {
    const { userClerkId, productId } = params;
    await connectToDatabase();
    const result = await getUserByClerkId(userClerkId);
    if (!result) {
      return { code: 404, message: 'User not found in buyProduct function' };
    }
    const product = await Product.findById(productId);
    if (!product) {
      return { code: 404, message: 'Product not found in buyProduct function' };
    }

    const user = result.user;

    if (user.balance < product.price) {
      return { code: 808, message: 'Insufficient balance', balance: user.balance };
    }
    if (user.products.includes(productId)) {
      return { code: 808, message: 'Product already bought' };
    }
    const updateData = { $inc: { balance: -product.price }, $push: { products: productId } };
    const updatedUser = await User.findByIdAndUpdate(user._id, updateData, { new: true });
    if (!updatedUser) {
      return { code: 404, message: 'Failed to update user' };
    }
    const productUpdateData = { $push: { users: updatedUser._id } };
    const updatedProduct = await Product.findByIdAndUpdate(productId, productUpdateData, { new: true });
    if (!updatedProduct) {
      return { code: 404, message: 'Failed to update product' };
    }
    const parsedUser = JSON.parse(JSON.stringify(updatedUser));
    const parsedProduct = JSON.parse(JSON.stringify(updatedProduct));
    return { code: 200, message: 'Product bought successfully', product: parsedProduct, user: parsedUser };
  } catch (error) {
    console.error(error);
  }
};
