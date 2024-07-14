import { connectToDatabase } from '../connectToDatabase';

interface calculateProfitParams {
  userId: string;
}

//TODO - Implement calculateProfit

export const calculateProfit = async (params: calculateProfitParams) => {
  try {
    const { userId } = params;
    await connectToDatabase();
  } catch (error) {
    console.error(error);
  }
};
