import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';

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
  } catch {
    return undefined;
  }
};
