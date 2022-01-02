import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import 'dotenv/config';

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return undefined;
    }
    const { hashedEmail } = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
    ) as jwt.JwtPayload;
    const user = await getRepository(User).findOne({
      where: { email: hashedEmail },
    });
    if (user) {
      console.log('유저 인증됨');
      return user;
    } else {
      return undefined;
    }
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
