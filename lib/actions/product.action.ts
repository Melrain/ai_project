'use server';

import Product, { IProduct } from '@/database/product';
import { User } from '@/database/user.model';
import { connectToDatabase } from '../connectToDatabase';
import { getUserByClerkId, updateUser } from './user.action';
import { SortOrder } from 'mongoose';
import { redirect } from 'next/navigation';

export const getProductById = async (productId: string) => {
  try {
    await connectToDatabase();
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error(error);
  }
};

interface GetAllProductsProps {
  filter: string;
  order: number;
}
export const getAllProducts = async (params: GetAllProductsProps) => {
  try {
    const { filter, order } = params;
    await connectToDatabase();
    let index: SortOrder = -1;
    if (order === 1) {
      index = 1;
    } else {
      index = -1;
    }
    const products = await Product.find().sort({ [filter]: index });
    if (!products) {
      throw new Error('No products found');
    }
    console.log(products);
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error(error);
  }
};

interface GetProductParams {
  productName: string;
}

export const getProduct = async (params: GetProductParams) => {
  try {
    const { productName } = params;
    await connectToDatabase();

    const product = await Product.find({ name: { $regex: productName, $options: 'i' } });

    if (!product) {
      return { code: 404, message: 'name not match' };
    }
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error(error);
  }
};

interface CreateProductProps {
  productName: string;
  price: number;
  picture: string;
  pictureCollection: string;
  description: string;
  revenuePerDay: number;
  passcode: number;
  levelRequirement: number;
  expOnPurchase: number;
}
export const createProduct = async (params: CreateProductProps) => {
  try {
    const {
      passcode,
      productName,
      pictureCollection,
      expOnPurchase,
      description,
      levelRequirement,
      price,
      picture,
      revenuePerDay
    } = params;
    await connectToDatabase();
    if (Number(passcode) !== 198900) {
      return { code: 404, message: 'passcode error', passcode };
    }
    const product = await Product.create({
      name: productName,
      price: Number(price),
      picture: picture,
      pictureCollection,
      description,
      users: [],
      revenuePerDay: revenuePerDay,
      levelRequirement: levelRequirement,
      expOnPurchase: expOnPurchase
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
    console.log(user);
    console.log('productId:', productId[0]);
    console.log(user.products.some((product: { id: string }) => product.id === productId[0]));
    if (user.balance < product.price) {
      return { code: 808, message: 'Insufficient balance', balance: user.balance };
    }
    if (user.products.some((product: { id: string }) => product.id === productId[0])) {
      return { code: 808, message: 'Product already bought' };
    }

    //handle exp
    const updatedLevel = Math.floor((user.exp + product.expOnPurchase) / 100);
    const updateData = {
      $inc: { balance: -product.price, exp: product.expOnPurchase },
      $set: { level: updatedLevel },
      $push: {
        products: {
          id: product._id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
    };
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

    //add transaction history

    return { code: 200, message: 'Product bought successfully', product: parsedProduct, user: parsedUser };
  } catch (error) {
    console.error(error);
  }
};
