import { Schema, model, models, Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  username: string;
  email: string;
  supervisor: {
    clerkId: string;
    username: string;
  };
  balance: number;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  supervisor: {
    clerkId: { type: String },
    username: { type: String }
  },
  balance: { type: Number, default: 0 }
});

export const User = models.User || model<IUser>('User', UserSchema);
