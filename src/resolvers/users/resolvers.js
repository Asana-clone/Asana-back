import db from '../../models/index.js';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';
const salt = Number(process.env.SALT);

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
        createdAt: user.dataValues.createdAt,
        updatedAt: user.dataValues.updatedAt,
      };
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      console.log(input);
      const { name, role, department, email, about, password } = input;
      //db생성문을 넣어야 합니다.
      const hashedPw = await bcrypt.hash(password, salt);
      const userExist = await User.findOne({ where: email });
      if (userExist) {
        return false;
      }
      await db.User.create({
        name,
        role,
        password: hashedPw,
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
