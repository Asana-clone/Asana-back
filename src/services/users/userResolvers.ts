import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { getRepository, getConnection } from 'typeorm';
import { User } from '../../entity/User';
import 'dotenv/config';
import { ctx, signInput, userInput } from '../interface';

const salt = Number(process.env.SALT);

const userResolvers = {
  Query: {
    signIn: async (_: any, { email, password }: signInput) => {
      try {
        const hashedPw = await bcrypt.hash(password, salt);
        const userExist = await getRepository(User).findOne({
          where: { email },
        });
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
    getProfile: async (_: any, __: any, { loggedInUser }: ctx) => {
      try {
        if (!loggedInUser) {
          throw new Error('로그인되어있지 않습니다.');
        }
        const user = getRepository(User).findOne({
          where: {
            email: loggedInUser.email,
          },
        });
        console.log(user);
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
    signUp: async (_: any, { input }: userInput) => {
      try {
        const provider = 'local';
        const { name, role, department, email, about, password } = input;
        //db생성문을 넣어야 합니다.
        const hashedPw = await bcrypt.hash(password, salt);
        const userExist = await getRepository(User).findOne({
          where: { email },
        });
        if (userExist) {
          return { statuscode: 400, err: '아이디 중복' };
        }
        const user = await getRepository(User).save({
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
    updateUser: async (_: any, { input }: userInput, { loggedInUser }: ctx) => {
      try {
        if (!loggedInUser) {
          throw new Error('로그인되어있지 않습니다.');
        }
        const { name, role, department, about } = input;
        await getConnection()
          .createQueryBuilder()
          .update(User)
          .set({ name, role, department, about })
          .where('email = :email', { email: loggedInUser.email })
          .execute();
        const user = await getRepository(User).findOne({
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
