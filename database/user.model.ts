import { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  first_name: string;
  last_name: string;
}
