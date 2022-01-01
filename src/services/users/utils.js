import jwt from 'jsonwebtoken';
import db from '../../models/index.js';

export const getUser = async (token) => {
  try {
    if (!token) {
      return undefined;
    }
    const { hashedEmail } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await db.User.findOne({ where: { email: hashedEmail } });
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
