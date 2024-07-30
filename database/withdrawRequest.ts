import { model, models, Document, Schema, ObjectId } from 'mongoose';

export interface IWithdrawRequest extends Document {
  userId: ObjectId;
  amount: number;
  state: string;
}

const WithdrawRequestSchema = new Schema<IWithdrawRequest>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    state: { type: String, default: 'pending' }
  },
  { timestamps: true }
);

export const WithdrawRequest =
  models.WithdrawRequest || model<IWithdrawRequest>('WithdrawRequest', WithdrawRequestSchema);
