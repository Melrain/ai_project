import { Schema, model, models, Document, ObjectId } from 'mongoose';

export interface IArticle extends Document {
  type: string;
  display: boolean;
  title: string;
  picture: string;
  content: string;
  author: ObjectId;
  views: number;
  upvotes: ObjectId[];
  downvotes: ObjectId[];
  comments: ObjectId[];
}

const articleSchema = new Schema<IArticle>(
  {
    type: { type: String, required: true },
    display: { type: Boolean, default: true },
    title: { type: String, required: true },
    picture: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    views: { type: Number, default: 0 },
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  },
  { timestamps: true }
);

const Article = models.Article || model<IArticle>('Article', articleSchema);

export default Article;
