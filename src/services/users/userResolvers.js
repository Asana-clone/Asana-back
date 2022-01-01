import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../../models/index.js';

const salt = Number(process.env.SALT);

const userResolvers = {
  Query: {
    signIn: async (_, { email, password }) => {
      try {
        const hashedPw = await bcrypt.hash(password, salt);
        const userExist = await db.User.findOne({ where: { email } });
        const pwCompared = await bcrypt.compare(password, hashedPw);

        if (!userExist || !pwCompared) {
          return {
            statuscode: 401,
            error: '이메일 또는 비밀번호가 잘못되었습니다',
          };
        }
        const hashedEmail = email;

        // refresh token 발급 (2주)
        const refreshToken = jwt.sign(
          { hashedEmail },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '14d',
          },
        );
        // access token 발급 (1시간)
        const accessToken = jwt.sign(
          { hashedEmail },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '1h',
          },
        );
        return {
          statuscode: 200,
          token: accessToken,
        };
      } catch (err) {
        return {
          statuscode: 401,
          err,
        };
      }
    },
    getProfile: async (_, __, { loggedInUser }) => {
      try {
        if (!loggedInUser) {
          throw new Error('로그인되어있지 않습니다.');
        }
        const user = db.User.findOne({
          email: loggedInUser.email,
          provider: loggedInUser.provider,
        });
        return user;
      } catch (err) {
        return {
          statuscode: 401,
          err,
        };
      }
    },
  },
  Mutation: {
    signUp: async (_, { input }) => {
      try {
        const provider = 'local';
        const { name, role, department, email, about, password } = input;
        //db생성문을 넣어야 합니다.
        const hashedPw = await bcrypt.hash(password, salt);
        const userExist = await db.User.findOne({ where: { email } });
        if (userExist) {
          return { statuscode: 400, err: '아이디 중복' };
        }
        const user = await db.User.create({
          name,
          email,
          role,
          password: hashedPw,
          provider,
          department,
          about,
        });
        return {
          statuscode: 200,
          user,
        };
      } catch (err) {
        console.error(err);
        return {
          statuscode: 400,
          err,
        };
      }
    },
    updateUser: async (_, { input }, { loggedInUser }) => {
      try {
        if (!loggedInUser) {
          throw new Error('로그인되어있지 않습니다.');
        }
        const { name, role, department, about } = input;
        await db.User.update(
          {
            name,
            role,
            department,
            about,
          },
          { where: { email: loggedInUser.email } },
        );
        const user = await db.User.findOne({
          where: { email: loggedInUser.email },
        });
        return {
          statuscode: 200,
          user,
        };
      } catch (err) {
        return {
          statuscode: 500,
          err,
        };
      }
    },
  },
};

export default userResolvers;
