import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import db from '../../models/index.js';

const salt = Number(process.env.SALT);

const userResolvers = {
  Query: {
    login: async (_, { email, password }) => {
      const provider = 'local';
      const hashedPw = await bcrypt.hash(password, salt);
      const userExist = await db.User.findOne({ where: { email, provider } });
      const pwCompared = await bcrypt.compare(password, hashedPw);

      if (!userExist || !pwCompared) {
        return {
          ok: false,
          error: "이메일 또는 비밀번호가 잘못되었습니다"
        };
      }
      const hashedEmail = provider + ' ' + email;

      // refresh token 발급 (2주)
      const refreshToken = jwt.sign({ hashedEmail }, process.env.JWT_SECRET_KEY, {
        expiresIn: '14d',
      });
      // access token 발급 (1시간)
      const accessToken = jwt.sign({ hashedEmail }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });
      return {
        ok: true,
        token: accessToken
      };
    },
    me: async (_, __, { loggedInUser }) => {
      const user = db.User.findOne({ email: loggedInUser.email, provider: loggedInUser.provider });
      return user;
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      console.log(input);
      const provider = 'local';
      const { name, role, department, email, about, password } = input;
      //db생성문을 넣어야 합니다.
      const hashedPw = await bcrypt.hash(password, salt);
      const userExist = await db.User.findOne({ where: { email, provider } });
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
