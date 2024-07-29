import { Schema, Document, models, model, ObjectId } from 'mongoose';

export interface IProduct extends Document {
  productId: number;
  available: boolean;
  state: string;
  type: string;
  name: string;
  title: string;
  notes: string;
  description: string;

  price: number;
  display: boolean;
  pictureCollection: string;
  picture: string;
  users: ObjectId[];
  revenuePerDay: number;
  levelRequirement: number;
  expOnPurchase: number;
  order: number;
}

const productSchema = new Schema<IProduct>(
  {
    productId: { type: Number, increment: true, default: 0 },
    available: { type: Boolean, default: true },
    state: { type: String, default: 'normal' },
    type: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    notes: { type: String, required: true },
    description: { type: String, required: true },

    price: { type: Number, required: true },
    display: { type: Boolean, default: true },
    pictureCollection: { type: String, required: true },
    picture: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    revenuePerDay: { type: Number, required: true },
    levelRequirement: { type: Number, required: true },
    expOnPurchase: { type: Number, required: true },
    order: { type: Number, required: true }
  },
  { timestamps: true }
);

const Product = models.Product || model<IProduct>('Product', productSchema);

export default Product;
