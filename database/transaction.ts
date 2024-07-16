import { Schema, model, models, Document, ObjectId } from 'mongoose';

export interface ITransaction extends Document {
  type: string;
  userId: ObjectId;
  amount: number;
  status: string;
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
}

// modify the transaction schema, make it general; especially the transactionId

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

const Transaction = models.Transaction || model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
