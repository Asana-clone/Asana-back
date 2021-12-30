import db from '../../models/index.js';

const sectionResolvers = {
  Mutation: {
    createSection: async (_, { input }) => {
      try {
        const { id,title } = input;
        const section = await db.Section.create({
          project:id,
          title
        });

        return {
          statuscode:200
        };
      } catch (err) {
        return {
          statuscode:400,
          err
        };
      }
    },
    updateSection: async (_, { input }) => {
      try {
        const { id, title } = input;
        await db.Section.update({ title }, {where: {id} });

        return {
          statuscode:200
        };
      } catch (err) {
        return {
          statuscode:400,
          err
        };
      }
    },
    deleteSection: async (_, { id }) => {
      try {
        await db.Section.destroy({ where: { id } });
        return {
          statuscode:200
        };
      } catch (err) {
        console.error(err);
        return {
          statuscode:400,
          err
        };
      }
    },
  },
};

export default sectionResolvers;
