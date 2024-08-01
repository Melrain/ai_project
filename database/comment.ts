import { Schema, ObjectId, model, models, Document } from 'mongoose';

export interface IComment extends Document {
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
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }]
  },
  { timestamps: true }
);

const Comment = models.Comment || model<IComment>('Comment', commentSchema);

export default Comment;
