import { Schema, model, models, Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  username: string;
  email: string;
  picture: string;
  supervisor: {
    clerkId: string;
    username: string;
  };
  level: number;
  products: { product: ObjectId; createdAt: Date; updatedAt: Date }[];
  topUpTransactions: ObjectId[];
  topUpAmount: number;
  balance: number;
  exp: number;
  totalProfit: number;
  registeredAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String, default: '' },
  topUpTransactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  supervisor: {
    clerkId: { type: String },
    username: { type: String }
  },
  level: { type: Number, default: 1 },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }
  ],
  topUpAmount: { type: Number, default: 0 },
  balance: { type: Number, default: 100 },
  exp: { type: Number, default: 100 },
  totalProfit: { type: Number, default: 0 },
  registeredAt: { type: Date, default: Date.now }
});

export const User = models.User || model<IUser>('User', UserSchema);
