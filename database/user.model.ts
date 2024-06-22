import { Schema, model, models, Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
  username: string;
  first_name: string;
  last_name: string;
  phone: {
    number: string;
    verified: boolean;
  };
  inviteLink: string;
  supervisor: ObjectId;
  balance: number;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: {
    number: { type: String, required: true },
    verified: { type: Boolean, default: false }
  },
  inviteLink: { type: String, required: true },
  supervisor: { type: Schema.Types.ObjectId, ref: 'User' },
  balance: { type: Number, default: 0 }
});

export const User = models.User || model<IUser>('User', UserSchema);
