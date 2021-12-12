import db from '../../models/index.js';

const userResolvers = {
  Query: {
    getUser: async (_, { id }) => {
      console.log(id);
      return {
        id,
        name: 'young',
        role: 'master',
        department: 'pokemon world',
        email: 'cxz5309@gmail.com',
        about: '전설의 포켓몬 마스터이다.',
      };
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      console.log(input);
      const { name, role, department, email, about, password } = input;
      //db생성문을 넣어야 합니다.
      await db.User.create({
        name,
        role,
        password,
        department,
        email,
        about,
      });

      return true;
    },
    deleteUser: async (_, { id }) => {
      console.log(id);
      return true;
    },
  },
};

export default userResolvers;
