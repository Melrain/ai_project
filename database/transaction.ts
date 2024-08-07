import { Schema, model, models, Document, ObjectId } from 'mongoose';

export interface ITransaction extends Document {
  type: string;
  userId: ObjectId;
  amount: number;
  status: string;
  notes?: {
    name: string;
    id: ObjectId;
  };
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
    notes: {
      name: {
        type: String
      },
      id: {
        type: Schema.Types.ObjectId
      }
    }
  },
  { timestamps: true }
);

const Transaction = models.Transaction || model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
