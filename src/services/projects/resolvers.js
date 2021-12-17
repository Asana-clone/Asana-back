import db from '../../models/index.js';

const projectResolvers = {
  Query: {
    getProject: async (_, { id }) => {
      console.log(id);
      const project = await db.Project.findOne({ where: { id } });
      console.log(project);
      return {
        id,
        title: project.dataValues.title,
        desc: project.dataValues.desc,
        inviteCode: project.dataValues.inviteCode,
        createdAt: project.dataValues.createdAt,
        updatedAt: project.dataValues.updatedAt,
      };
    },
  },
  Mutation: {
    createProject: async (_, { input }) => {
      console.log(input);
      const { title, desc } = input;
      //inviteCode 생성 어떻게..?
      const inviteCode = 1;
      await db.Project.create({
        title,
        desc,
        inviteCode,
      });

      return true;
    },
    deleteProject: async (_, { id }) => {
      console.log(id);
      try {
        await db.Project.destroy({ where: { id } });
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
};

export default projectResolvers;
