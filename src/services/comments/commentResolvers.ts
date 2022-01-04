import { getRepository, getConnection } from 'typeorm';
import { Comment } from '../../entity/Comment';
import { User } from '../../entity/User';
import { createCommentInput, ctx, updateCommentInput } from '../interface';

const sectionResolvers = {
  Mutation: {
    createComment: async (
      _: any,
      { input }: createCommentInput,
      { loggedInUser }: ctx,
    ) => {
      try {
        if (!loggedInUser) {
          throw new Error('로그인되어있지 않습니다.');
        }
        const { taskId, contents } = input;
        const user = await getRepository(User).findOne({
          where: {
            email: loggedInUser.email,
          },
        });
        await getRepository(Comment).save({
          task: taskId,
          user: user.id,
          contents,
        });
        return {
          statuscode: 200,
        };
      } catch (message) {
        return {
          statuscode: 500,
          message,
        };
      }
    },
    updateComment: async (
      _: any,
      { input }: updateCommentInput,
      { loggedInUser }: ctx,
    ) => {
      try {
        if (!loggedInUser) {
          throw new Error('로그인되어있지않습니다');
        }
        const user = await getRepository(User).findOne({
          where: {
            email: loggedInUser.email,
          },
        });
        const { id, contents } = input;
        const isAuthor = await getRepository(Comment).findOne({
          where: { id, user: user.id },
        });
        if (isAuthor) {
          isAuthor.contents = contents;
          await isAuthor.save();
          return {
            statuscode: 200,
          };
        } else {
          throw new Error('작성자가 아닙니다');
        }
      } catch (message) {
        console.error(message);
        return {
          statuscode: 500,
          message,
        };
      }
    },
    deleteComment: async (
      _: any,
      { id }: { id: number },
      { loggedInUser }: ctx,
    ) => {
      try {
        if (!loggedInUser) {
          throw new Error('로그인되어있지않습니다');
        }
        const user = await getRepository(User).findOne({
          where: {
            email: loggedInUser.email,
          },
        });
        const isAuthor = await getRepository(Comment).findOne({
          where: { id, user: user.id },
        });
        if (isAuthor) {
          await getRepository(Comment).remove(isAuthor);
          return {
            statuscode: 200,
          };
        } else {
          throw new Error('작성자가 아닙니다');
        }
      } catch (message) {
        return {
          statuscode: 500,
          message,
        };
      }
    },
  },
};

export default sectionResolvers;
