import { model, models, Document, Schema, ObjectId } from 'mongoose';

export interface IWithdrawRequest extends Document {
  userId: ObjectId;
  amount: number;
}

const WithdrawRequestSchema = new Schema<IWithdrawRequest>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true }
  },
  { timestamps: true }
);

export const WithdrawRequest =
  models.WithdrawRequest || model<IWithdrawRequest>('WithdrawRequest', WithdrawRequestSchema);
