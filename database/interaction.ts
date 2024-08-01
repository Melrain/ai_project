import { Schema, model, models, Document, ObjectId } from 'mongoose';

export interface IInteraction extends Document {
  userId: ObjectId;
  action: string;
  articleId: ObjectId;
  commentId: ObjectId;
}

const interactionSchema = new Schema<IInteraction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    articleId: { type: Schema.Types.ObjectId, ref: 'Article' },
    commentId: { type: Schema.Types.ObjectId, ref: 'Comment' }
  },
  { timestamps: true }
);

const Interaction = models.Interaction || model<IInteraction>('Interaction', interactionSchema);

export default Interaction;
