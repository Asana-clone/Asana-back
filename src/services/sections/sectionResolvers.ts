import { getRepository, getConnection } from 'typeorm';
import { Section } from '../../entity/Section';
import { createSectionInput, updateSectionInput } from '../interface';

const sectionResolvers = {
  Mutation: {
    createSection: async (_: any, { input }: createSectionInput) => {
      try {
        const { projectId, title } = input;
        await getRepository(Section).save({
          title,
          projectId: projectId,
        });
        return {
          statuscode: 200,
        };
      } catch (message) {
        return {
          statuscode: 400,
          message,
        };
      }
    },
    updateSection: async (_: any, { input }: updateSectionInput) => {
      try {
        const { id, title } = input;
        await getConnection()
          .createQueryBuilder()
          .update(Section)
          .set({ title })
          .where('id = :id', { id })
          .execute();
        return {
          statuscode: 200,
        };
      } catch (message) {
        return {
          statuscode: 400,
          message,
        };
      }
    },
    deleteSection: async (_: any, { id }: { id: number }) => {
      try {
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(Section)
          .where('id=:id', { id })
          .execute();
        return {
          statuscode: 200,
        };
      } catch (message) {
        console.error(message);
        return {
          statuscode: 400,
          message,
        };
      }
    },
  },
};

export default sectionResolvers;
