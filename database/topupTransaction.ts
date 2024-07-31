import { Schema, model, models, Document, ObjectId } from 'mongoose';

interface ITopupTransaction extends Document {
  type: string;
  mongoUserId: ObjectId;
  isFirstTopup: boolean;
  amount: number;
  status: string;
}

const TopupTransactionSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    mongoUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isFirstTopup: {
      type: Boolean,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const TopupTransaction =
  models.TopupTransaction || model<ITopupTransaction>('TopupTransaction', TopupTransactionSchema);

export default TopupTransaction;
