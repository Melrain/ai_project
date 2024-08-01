import { Schema, model, models, Document, ObjectId } from 'mongoose';

export interface IInteraction extends Document {
  user: ObjectId;
  action: string;
  article: ObjectId;
  comment: ObjectId;
}

const interactionSchema = new Schema<IInteraction>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    article: { type: Schema.Types.ObjectId, ref: 'Article' },
    comment: { type: Schema.Types.ObjectId, ref: 'Comment' }
  },
  { timestamps: true }
);

const Interaction = models.Interaction || model<IInteraction>('Interaction', interactionSchema);

export default Interaction;
