import { Schema, model, models, Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  supervisor: string;
  balance: number;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  supervisor: { type: String },
  balance: { type: Number, default: 0 }
});

export const User = models.User || model<IUser>('User', UserSchema);
