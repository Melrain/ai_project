import { Schema, Document, models, model, ObjectId } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: string;
  picture: string;
  users: [ObjectId];
  revenuePerDay: number;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: String, required: true },
  picture: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  revenuePerDay: { type: Number, required: true }
});

const Product = models.Product || model<IProduct>('Product', productSchema);

export default Product;
