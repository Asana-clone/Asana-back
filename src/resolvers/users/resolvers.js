import db from '../../models/index.js';

const userResolvers = {
  Query: {
    getUser: async (_, { id }) => {
      console.log(id);
      const user = await db.User.findOne({ where: { id } });
      return {
        id,
        name: user.dataValues.name,
        role: user.dataValues.role,
        department: user.dataValues.department,
        email: user.dataValues.email,
        about: user.dataValues.about,
      };
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      console.log(input);
      const { name, role, department, email, about, password } = input;
      //db생성문을 넣어야 합니다.
      await db.User.create({
        name,
        role,
        password,
        department,
        email,
        about,
      });

      return true;
    },
    deleteUser: async (_, { id }) => {
      console.log(id);
      try {
        await db.User.destroy({ where: { id } });
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
};

export default userResolvers;
