import { getConnection, getRepository } from 'typeorm';
import { Task } from '../../entity/Task';
import { ctx, createTaskInput, updateTaskInput } from '../interface';
import { Like } from '../../entity/Like';
import { Tag } from '../../entity/Tag';
import { TagRelation } from '../../entity/TagRelation';

const taskResolvers = {
  Query: {
    getTaskDetail: async (_: any, { id }: { id: number }) => {
      try {
        const task = await getRepository(Task)
          .createQueryBuilder('tasks')
          .leftJoinAndSelect('tasks.comments', 'comments')
          .leftJoinAndSelect('tasks.user', 'users')
          .leftJoinAndSelect('comments.user', 'user')
          .leftJoinAndSelect('tasks.tagRelations', 'tagRelations')
          .leftJoinAndSelect('tagRelations.tag', 'tag')
          .where({ id })
          .getOne();
        console.log(task);
        return {
          statuscode: 200,
          task,
        };
      } catch (message) {
        console.error(message);
        return {
          statuscode: 400,
          message,
        };
      }
    },
  },

  Mutation: {
    createTask: async (_: any, { input }: createTaskInput) => {
      try {
        console.log(input);
        const {
          sectionId,
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
          section: sectionId,
          title,
          desc,
          user: userId,
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
      } catch (message) {
        console.error(message);
        return {
          statuscode: 400,
          message,
        };
      }
    },

    updateTask: async (_: any, { input }: updateTaskInput) => {
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
      } catch (message) {
        console.error(message);
        return {
          statuscode: 400,
          message,
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
      } catch (message) {
        console.error(message);
        return {
          statuscode: 400,
          message,
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
      } catch (message) {
        console.error(message);
        return {
          statuscode: 400,
          message,
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
      } catch (message) {
        console.error(message);
        return {
          statuscode: 500,
          message,
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
      } catch (message) {
        console.error(message);
        return {
          statuscode: 500,
          message,
        };
      }
    },
  },
};

export default taskResolvers;
