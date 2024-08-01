'use server';

import Article, { IArticle } from '@/database/article';
import { connectToDatabase } from '../connectToDatabase';
import { getUserByClerkId } from '../actions/user.action';

// get
interface GetArticleParams {
  articleId: string;
}

export const getArticle = async (params: GetArticleParams) => {
  try {
    const { articleId } = params;
    await connectToDatabase();
    const article = await Article.findById(articleId);
    if (!article) {
      throw new Error('Article not found');
    }
    return JSON.parse(JSON.stringify(article));
  } catch (error) {
    console.error(error);
  }
};

// get all
export const getAllArticles = async () => {
  try {
    await connectToDatabase();
    const articles = await Article.find();
    if (!articles) {
      throw new Error('Articles not found');
    }
    return JSON.parse(JSON.stringify(articles));
  } catch (error) {
    console.error(error);
  }
};

// create
interface CreateArticleParams {
  type: string;
  display: boolean;
  title: string;
  picture: string;
  content: string;
}

export const createArticle = async (params: CreateArticleParams) => {
  try {
    const { type, display, title, picture, content } = params;
    await connectToDatabase();
    const article = await Article.create({
      type,
      display,
      title,
      picture,
      content
    });
    if (!article) {
      throw new Error('Article not created');
    }
    return JSON.parse(JSON.stringify(article));
  } catch (error) {
    console.error(error);
  }
};

// update
interface UpdateArticleParams {
  articleId: string;
  updateData: Partial<IArticle>;
}

export const updateArticle = async (params: UpdateArticleParams) => {
  try {
    const { articleId, updateData } = params;
    await connectToDatabase();
    const article = await Article.findByIdAndUpdate(articleId, updateData, { new: true });
    if (!article) {
      throw new Error('Article not found');
    }
    return JSON.parse(JSON.stringify(article));
  } catch (error) {
    console.error(error);
  }
};

// delete
interface DeleteArticleParams {
  articleId: string;
  userId: string;
}

export const deleteArticle = async (params: DeleteArticleParams) => {
  try {
    const { articleId, userId } = params;
    await connectToDatabase();
    const userRes = await getUserByClerkId(userId);
    if (!userRes) {
      throw new Error('User not found');
    }
    if (userRes.user.type !== 'super admin') {
      throw new Error('User not authorized');
    }
    const article = await Article.findByIdAndDelete(articleId);
    if (!article) {
      throw new Error('Article not found');
    }
    return { message: 'Article deleted' };
  } catch (error) {
    console.error(error);
  }
};
