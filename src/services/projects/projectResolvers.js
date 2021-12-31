import db from '../../models/index.js';

const projectResolvers = {
  Query: {
    getProject: async (_, { id }) => {
      const project = await db.Project.findOne({ where: { id } });
      console.log(project);
      return project;
    },
    getProjects: async () => {
      const projects = await db.Project.findAll();
      console.log(projects);
      return projects;
    },
  },
  Mutation: {
    createProject: async (_, { input }) => {
      try {
        console.log(input);
        const { title, desc } = input;
        //inviteCode 생성 어떻게..?
        const inviteCode = 1;
        console.log(1)
        const project = await db.Project.create({
          title,
          desc,
          inviteCode,
        });
        console.log(2)
        return {
          ok: true,
          project,
        };
      } catch (err) {
        console.error(err)
        return {
          ok: false,
          err,
        };
      }
    },
    updateProject: async (_, { input }) => {
      try {
        console.log(input);
        const { id, title, desc } = input;
        const project = await db.Project.update({ title, desc }, { id });

        return {
          ok: true,
          project,
        };
      } catch (err) {
        return {
          ok: false,
          err,
        };
      }
    },
    deleteProject: async (_, { id }) => {
      console.log(id);
      try {
        await db.Project.destroy({ where: { id } });
        return {
          ok: true,
        };
      } catch (err) {
        console.error(err);
        return {
          ok: false,
          err,
        };
      }
    },
  },
};

export default projectResolvers;
