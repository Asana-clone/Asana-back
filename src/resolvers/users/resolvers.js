import jwt from 'jsonwebtoken'
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
    login: async (_, { email, password }) => {
      const provider = 'local';
      const hashedPw = await bcrypt.hash(password, salt);
      const userExist = await User.findOne({ where: { email, provider } });
      const pwCompared = await bcrypt.compare(hashedPw, password);
      if (!userExist) { return false; }
      if (!pwCompared) { return false; }
      // refresh token 발급 (2주)
      const refreshToken = jwt.sign(provider + email, env.JWT_SECRET_KEY, {
        expiresIn: '14d',
      });
      // access token 발급 (1시간)
      const accessToken = jwt.sign(provider + email, env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });
      return accessToken;
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      console.log(input);
      const provider = 'local';
      const { name, role, department, email, about, password } = input;
      //db생성문을 넣어야 합니다.
      const hashedPw = await bcrypt.hash(password, salt);
      const userExist = await User.findOne({ where: { email, provider } });
      if (userExist) {
        return false;
      }
      await db.User.create({
        name,
        email,
        role,
        password: hashedPw,
        provider,
        department,
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
