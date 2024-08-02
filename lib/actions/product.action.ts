'use server';

import Product, { IProduct } from '@/database/product';
import { User } from '@/database/user.model';
import { connectToDatabase } from '../connectToDatabase';
import { getUserByClerkId, updateUser } from './user.action';
import { SortOrder } from 'mongoose';
import { createTransaction } from './transaction.action';

export const getAllProductsClean = async () => {
  try {
    const products = await Product.find();
    if (!products) {
      throw new Error('No products found');
    }
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error(error);
  }
};

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
  available: boolean;
  state: string;
  type: string;
  name: string;
  title: string;
  notes: string;
  description: string;
  contractText: string;
  contractPicture: string;
  price: number;
  display: boolean;
  pictureCollection: string;
  picture: string;
  users: string[];
  revenuePerDay: number;
  levelRequirement: number;
  expOnPurchase: number;
  order: number;
}
export const createProduct = async (params: CreateProductProps) => {
  try {
    const {
      available,
      state,
      type,
      name,
      title,
      notes,
      description,
      price,
      display,
      pictureCollection,
      picture,
      users,
      revenuePerDay,
      levelRequirement,
      expOnPurchase,
      order
    } = params;
    await connectToDatabase();

    const allProducts = await Product.find();
    let maxProductId = 0;
    allProducts.forEach((product) => {
      if (product.productId > maxProductId) {
        maxProductId = product.productId;
      }
    });

    const product = new Product({
      productId: maxProductId + 1,
      available,
      state,
      type,
      name,
      title,
      notes,
      description,
      price,
      display,
      pictureCollection,
      picture,
      users,
      revenuePerDay,
      levelRequirement,
      expOnPurchase,
      order
    });
    if (!product) {
      throw new Error('Failed to create product');
    }
    await product.save();
    console.log(product);
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
    if (user.products.some((p: { product: { _id: string } }) => p.product._id === productId[0])) {
      return { code: 808, message: 'Product already bought' };
    }

    //handle exp
    const updatedLevel = Math.floor((user.exp + product.expOnPurchase) / 100);
    const updateData = {
      $inc: { balance: -product.price, exp: product.expOnPurchase, level: updatedLevel },

      $push: {
        products: {
          product: product._id,
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
    const transactionData = {
      type: 'purchase',
      userId: user._id,
      amount: product.price,
      status: 'success',
      notes: { name: product.name, id: product._id }
    };
    const transaction = await createTransaction(transactionData);
    if (!transaction) {
      return { code: 404, message: 'Failed to create transaction" ' };
    }

    return { code: 200, message: 'Product bought successfully', product: parsedProduct, user: parsedUser, transaction };
  } catch (error) {
    console.error(error);
  }
};

export const deleteProductById = async (productId: string) => {
  try {
    await connectToDatabase();
    const result = await Product.findByIdAndDelete(productId);
    if (!result) {
      throw new Error('Product not found');
    }

    return { code: 200, message: 'Product deleted successfully' };
  } catch (error) {
    console.error(error);
  }
};

interface Props {
  productId: string;
  updateData: {
    available: boolean;
    state: string;
    type: string;
    name: string;
    title: string;
    notes: string;
    description: string;
    contractText: string;
    contractPicture: string;
    price: number;
    display: boolean;
    pictureCollection: string;
    picture: string;
    users: string[];
    revenuePerDay: number;
    levelRequirement: number;
    expOnPurchase: number;
    order: number;
  };
}
export const updateProductById = async ({ productId, updateData }: Props) => {
  try {
    await connectToDatabase();
    const result = await Product.findOneAndUpdate({ _id: productId }, updateData, { new: true });
    if (!result) {
      throw new Error('Product not found');
    }
    return { code: 200, message: 'Product updated successfully', product: result };
  } catch (error) {
    console.error(error);
  }
};
