import { Schema, model, models, Document, ObjectId } from 'mongoose';

export type UserType = 'client' | 'admin' | 'superadmin' | 'agent' | 'clerk';
export type State = 'normal' | 'banned';
export interface IUser extends Document {
  type: UserType;
  state: State;
  clerkId: string;
  username: string;
  level: number;
  email: string;
  picture: string;
  supervisor: {
    clerkId: string;
    username: string;
  };
  teamMembers: ObjectId[];
  invitedPeople: ObjectId[];
  firstTimeTopup: boolean;
  currentLoginIpAddress: string;
  products: { product: ObjectId; createdAt: Date; updatedAt: Date }[];
  topUpTransactions: ObjectId[];
  topUpAmount: number;
  balance: number;
  exp: number;
  totalProfit: number;
}

const UserSchema = new Schema<IUser>(
  {
    type: { type: String, required: true },
    state: { type: String, required: true },
    clerkId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    level: { type: Number, required: true },
    email: { type: String, required: true },
    picture: { type: String, required: true },
    supervisor: {
      clerkId: { type: String, required: true },
      username: { type: String, required: true }
    },
    teamMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    invitedPeople: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    firstTimeTopup: { type: Boolean, required: true, default: true },
    currentLoginIpAddress: { type: String, required: true, default: 'unknown' },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        createdAt: { type: Date, required: true },
        updatedAt: { type: Date, required: true }
      }
    ],
    topUpTransactions: [{ type: Schema.Types.ObjectId, ref: 'TopUpTransaction' }],
    topUpAmount: { type: Number, required: true },
    balance: { type: Number, required: true },
    exp: { type: Number, required: true },
    totalProfit: { type: Number, required: true }
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>('User', UserSchema);
