import db from '../../models/index.js';

const taskResolvers = {
  Query: {
    getTaskDetail: async (_, { id }) => {
      try {
        const task = await db.Task.findOne({
          where: { id },
          include: [
            {
              model: db.Comment,
              attributes: ['id', 'comment', 'createdAt'],
              include: {
                model: db.User,
                attributes: ['name'],
              },
            },
            {
              model: db.Tag,
              attributes: ['id', 'name', 'color'],
            },
            {
              model: db.SubTask,
              attributes: ['id', 'title', 'assignee', 'startDate', 'dueDate'],
            },
          ],
          attributes: [
            'id',
            'title',
            'desc',
            'assignee',
            'startDate',
            'dueDate',
            'type',
            'status',
            'process',
            'priority',
          ],
        });
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
    createTask: async (_, { input }) => {
      try {
        console.log(input);
        const {
          id,
          title,
          desc,
          assignee,
          startDate,
          dueDate,
          status,
          type,
          process,
          priority,
        } = input;
        await db.Task.create({
          section: id,
          title,
          desc,
          assignee,
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
    updateTask: async (_, { input }) => {
      try {
        //추후 수정
        const {
          id,
          title,
          desc,
          asignee,
          startDate,
          dueDate,
          type,
          status,
          process,
          priority,
        } = input;
        await db.Task.update(
          {
            title,
            desc,
            asignee,
            startDate,
            dueDate,
            type,
            status,
            process,
            priority,
          },
          { where: { id } },
        );
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
    deleteTask: async (_, { id }) => {
      try {
        await db.Task.destroy({ where: { id } });
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
    like: async (_, { id }, { loggedInUser }) => {
      try {
        const user = loggedInUser;
        const likeExist = await db.Like.findOne({ where: { task: id, user } });
        if (likeExist) {
          await db.Like.destroy({ where: { user, task: id } });
          likeNum = await db.Like.count({ where: { task: id } });
          await db.Task.update({ likeNum }, { where: { task: id } });
          return {
            statuscode: 200,
            msg: '좋아요 취소',
          };
        } else {
          await db.Like.create({
            user,
            task: id,
          });
          likeNum = await db.Like.count({ where: { task: id } });
          await db.Task.update({ likeNum }, { where: { task: id } });
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
  },
};

export default taskResolvers;
