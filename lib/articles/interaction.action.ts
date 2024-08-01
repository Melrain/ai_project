import Article from '@/database/article';
import { connectToDatabase } from '../connectToDatabase';
import Interaction from '@/database/interaction';

// create
interface CreateInteractionParams {
  userId: string;
  action: string;
  articleId: string;
  commentId: string;
}

export const viewInteraction = async (params: CreateInteractionParams) => {
  try {
    const { userId, action, articleId, commentId } = params;
    await connectToDatabase();
    await Article.findByIdAndUpdate(articleId, { $inc: { views: 1 } });
    if (userId) {
      const existingInteraction = await Interaction.findOne({
        userId: userId,
        action: 'view',
        commentId: commentId
      });

      if (existingInteraction) return console.log('Interaction already exists');

      // create interaction
      await Interaction.create({
        userId,
        action,
        articleId,
        commentId
      });
    }
  } catch (error) {
    console.error(error);
  }
};
