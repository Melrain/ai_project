import { Schema, model, models, Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
  username: string;
  first_name: string;
  last_name: string;
  inviteLink: string;
  supervisor: string;
  balance: number;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  inviteLink: { type: String, required: true },
  supervisor: { type: String },
  balance: { type: Number, default: 0 }
});

export const User = models.User || model<IUser>('User', UserSchema);
