import { getRepository, getConnection } from 'typeorm';
import { Goal } from '../../entity/Goal';
import { createGoalInput, updateGoalInput, ctx, idInput } from '../interface';

const goalResolvers = {
  Mutation: {
    createGoal: async (
      _: any,
      { input }: createGoalInput,
      { loggedInUser }: ctx,
    ) => {
      try {
        if (!loggedInUser) {
          throw new Error('로그인되어있지 않습니다.');
        }
        const { name, projectId, startDate, dueDate, percentage } = input;

        const goal = await getRepository(Goal).save({
          name,
          project: projectId,
          startDate,
          dueDate,
          percentage,
        });
        return {
          statuscode: 200,
          goal,
        };
      } catch (message) {
        return {
          statuscode: 500,
          message,
        };
      }
    },
    updateGoal: async (
      _: any,
      { input }: updateGoalInput,
      { loggedInUser }: ctx,
    ) => {
      try {
        if (!loggedInUser) {
          throw new Error('로그인되어있지않습니다');
        }
        const { id, name, projectId, startDate, dueDate, percentage } = input;
        await getConnection()
          .createQueryBuilder()
          .update(Goal, {
            name,
            project: projectId,
            startDate,
            dueDate,
            percentage,
          })
          .where('id = :id', { id })
          .execute();
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
    deleteGoal: async (_: any, { id }: idInput, { loggedInUser }: ctx) => {
      try {
        if (!loggedInUser) {
          throw new Error('로그인되어있지않습니다');
        }
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(Goal)
          .where('id=:id', { id })
          .execute();
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
  },
};

export default goalResolvers;
