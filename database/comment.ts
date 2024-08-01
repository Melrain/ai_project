import { Schema, ObjectId, model, models, Document } from 'mongoose';

interface IComment extends Document {
  author: ObjectId;
  article: ObjectId;
  content: string;
  upvotes: ObjectId[];
  downvotes: ObjectId[];
}

const commentSchema = new Schema<IComment>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    article: { type: Schema.Types.ObjectId, ref: 'Article' },
    content: { type: String, required: true },
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);
