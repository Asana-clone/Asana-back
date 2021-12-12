import db from '../../models/index.js';

const projectResolvers = {
  Query: {
    getProject: async (_, { id }) => {
      console.log(id);
      return {
        id,
        title: '프로젝트',
        desc: 'ㅎㅎ',
        inviteCode: 'https://naver.com',
      };
    },
  },
};

export default projectResolvers;
