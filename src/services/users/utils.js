import jwt from "jsonwebtoken";
import db from '../../models/index.js';

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { hashedEmail } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const provider = hashedEmail.split(' ')[0];
    const email = hashedEmail.split(' ')[1];
    const user = await db.User.findOne({ where: { email, provider } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};