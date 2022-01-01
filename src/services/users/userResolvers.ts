import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from '../../entity/User';

const salt = Number(process.env.SALT);

const userResolvers: object = {
  Query: {
    signIn: () => 1,
  },
};

export default userResolvers;
