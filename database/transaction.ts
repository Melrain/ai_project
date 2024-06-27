import { Schema, model, models, Document } from 'mongoose';

export interface TransactionInterface extends Document {
  type: string;
  userId: string;
  amount: number;
  status: string;
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    transactionId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Transaction = models.Transaction || model<TransactionInterface>('Transaction', TransactionSchema);

export default Transaction;
