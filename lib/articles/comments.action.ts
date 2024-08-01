import Comment, { IComment } from '@/database/comment';
import { connectToDatabase } from '../connectToDatabase';

// get
interface GetCommentParams {
  commentId: string;
}

export const getComment = async (params: GetCommentParams) => {
  try {
    const { commentId } = params;
    await connectToDatabase();
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }
    return JSON.parse(JSON.stringify(comment));
  } catch (error) {
    console.error(error);
  }
};

// get all

export const getAllComments = async () => {
  try {
    await connectToDatabase();
    const comments = await Comment.find();
    if (!comments) {
      throw new Error('Comments not found');
    }
    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.error(error);
  }
};

//create
interface CreateCommentParams {
  author: string;
  article: string;
  content: string;
}

export const createComment = async (params: CreateCommentParams) => {
  try {
    const { author, article, content } = params;
    await connectToDatabase();
    const comment = await Comment.create({
      author,
      article,
      content
    });
    if (!comment) {
      throw new Error('Comment not created');
    }
    return JSON.parse(JSON.stringify(comment));
  } catch (error) {
    console.error(error);
  }
};

// update

interface UpdateCommentParams {
  commentId: string;
  updateData: Partial<IComment>;
}

export const updateComment = async (params: UpdateCommentParams) => {
  try {
    const { commentId, updateData } = params;
    await connectToDatabase();
    const comment = await Comment.findByIdAndUpdate(commentId, updateData, {
      new: true
    });
    if (!comment) {
      throw new Error('Comment not found');
    }
    return JSON.parse(JSON.stringify(comment));
  } catch (error) {
    console.error(error);
  }
};

// delete

interface DeleteCommentParams {
  commentId: string;
  userId: string;
}

export const deleteComment = async (params: DeleteCommentParams) => {
  try {
    const { commentId, userId } = params;
    await connectToDatabase();
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }
    if (comment.author.toString() !== userId) {
      throw new Error('Unauthorized');
    }
    await Comment.findByIdAndDelete(commentId);
    return { message: 'Comment deleted' };
  } catch (error) {
    console.error(error);
  }
};
