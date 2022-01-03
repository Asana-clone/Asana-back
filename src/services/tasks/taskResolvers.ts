import { getConnection, getRepository } from 'typeorm';
import { Task } from '../../entity/Task';
import { ctx, taskInput } from '../interface';
import { Like } from '../../entity/Like';
import { Tag } from '../../entity/Tag';
import { TagRelation } from '../../entity/TagRelation';

const taskResolvers = {
  Query: {
    getTaskDetail: async (_: any, { id }: { id: number }) => {
      try {
        const task = await getRepository(Task)
          .createQueryBuilder('tasks')
          .leftJoinAndSelect('tasks.commentId', 'commentId')
          .innerJoinAndSelect('comments.userId', 'userId')
          .leftJoinAndSelect('tasks.tags', 'tags')
          .where({ id })
          .getOne();
        return {
          statuscode: 200,
          task,
        };
      } catch (err) {
        console.error(err);
        return {
          statuscode: 400,
          err,
        };
      }
    },
  },
  Mutation: {
    createTask: async (_: any, { input }: taskInput) => {
      try {
        console.log(input);
        const {
          id,
          title,
          desc,
          userId,
          startDate,
          dueDate,
          status,
          type,
          process,
          priority,
        } = input;
        await getRepository(Task).save({
          sectionId: id,
          title,
          desc,
          userId,
          startDate,
          dueDate,
          status,
          type,
          process,
          priority,
        });
        return {
          statuscode: 200,
        };
      } catch (err) {
        console.error(err);
        return {
          statuscode: 400,
          err,
        };
      }
    },
    updateTask: async (_: any, { input }: taskInput) => {
      try {
        //추후 수정
        const {
          id,
          title,
          desc,
          userId,
          startDate,
          dueDate,
          type,
          status,
          process,
          priority,
          sectionId,
        } = input;
        await getConnection()
          .createQueryBuilder()
          .update(Task)
          .set({
            title,
            desc,
            user: userId,
            startDate,
            dueDate,
            type,
            status,
            process,
            priority,
            section: sectionId,
          })
          .where('id = :id', { id })
          .execute();
        return {
          statuscode: 200,
        };
      } catch (err) {
        return {
          statuscode: 400,
          err,
        };
      }
    },
    deleteTask: async (_: any, { id }: { id: number }) => {
      try {
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(Task)
          .where('id=:id', { id })
          .execute();
        return {
          statuscode: 200,
        };
      } catch (err) {
        console.error(err);
        return {
          statuscode: 400,
          err,
        };
      }
    },
    likeTask: async (_: any, { id }: { id: number }, { loggedInUser }: ctx) => {
      try {
        const user = loggedInUser;
        const likeExist = await getRepository(Like).findOne({
          where: { task: id, user },
        });
        if (likeExist) {
          await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Like)
            .where('user = :user AND task=:task', { user, task: id })
            .execute();
          const likeNum = await getRepository(Like).count({
            where: { task: id },
          });
          await getConnection()
            .createQueryBuilder()
            .update(Task)
            .set({ likeNum })
            .where('task=:task', { task: id })
            .execute();
          return {
            statuscode: 200,
            msg: '좋아요 취소',
          };
        } else {
          await getRepository(Like).save({ user, taskId: id });
          const likeNum = await getRepository(Like).count({
            where: { task: id },
          });
          await getConnection()
            .createQueryBuilder()
            .update(Task)
            .set({ likeNum })
            .where('task=:task', { task: id })
            .execute();
          return {
            statuscode: 200,
            msg: '좋아요 성공',
          };
        }
      } catch (err) {
        console.error(err);
        return {
          statuscode: 400,
          err,
        };
      }
    },
    createTag: async (
      _: any,
      { taskId, name, color }: { taskId: number; name: string; color: string },
    ) => {
      try {
        const tagExist = await getRepository(Tag).findOne({
          where: { name, color },
        });
        if (tagExist) {
          await getRepository(TagRelation).save({
            tag: tagExist.id,
            task: taskId,
          });
        } else {
          const tag = await getRepository(Tag).save({
            name,
            color,
          });
          await getRepository(TagRelation).save({
            tag: tag.id,
            task: taskId,
          });
        }
        return {
          statuscode: 200,
        };
      } catch (err) {
        console.error(err);
        return {
          statuscode: 500,
          err,
        };
      }
    },
    deleteTag: async (
      _: any,
      { id, taskId }: { id: number; taskId: number },
    ) => {
      try {
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(TagRelation)
          .where('tag = :tag AND task = :task', { tag: id, task: taskId })
          .execute();
        return {
          statuscode: 200,
        };
      } catch (err) {
        console.error(err);
        return {
          statuscode: 500,
          err,
        };
      }
    },
  },
};

export default taskResolvers;
