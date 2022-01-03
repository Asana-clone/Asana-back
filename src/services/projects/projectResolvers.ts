import { getRepository, getConnection } from 'typeorm';
import { idInput, createProjectInput, updateProjectInput } from '../interface';
import { Project } from '../../entity/Project';

const projectResolvers = {
  Query: {
    getProjectDetail: async (_: any, { id }: idInput) => {
      try {
        const project = await getRepository(Project)
          .createQueryBuilder()
          .leftJoinAndSelect('Project.projectMembers', 'projectMember')
          .leftJoinAndSelect('Project.belongs', 'belong')
          .leftJoinAndSelect('Project.sections', 'section')
          .leftJoinAndSelect('Project.goals', 'goal')
          .whereInIds(id)
          .getOne();
        return {
          statuscode: 200,
          project,
        };
      } catch (err) {
        console.error(err);
        return {
          statuscode: 500,
          err,
        };
      }
    },
    getProjectList: async () => {
      try {
        const projects = await getRepository(Project)
          .createQueryBuilder()
          .leftJoinAndSelect('Project.projectMembers', 'projectMember')
          .leftJoinAndSelect('Project.belongs', 'belong')
          .leftJoinAndSelect('Project.sections', 'section')
          .leftJoinAndSelect('Project.goals', 'goal')
          .getMany();

        console.log(projects);
        return {
          statuscode: 200,
          projects,
        };
      } catch (err) {
        console.error(err);
        return {
          statuscode: 500,
          err,
        };
      }
    },
  },
  Mutation: {
    createProject: async (_: any, { input }: createProjectInput) => {
      console.log(input);
      try {
        const { title, desc } = input;
        //TODO inviteCode 생성
        const inviteCode = '1';
        const project = await getRepository(Project).save({
          title,
          desc,
          inviteCode,
        });
        return {
          statuscode: 200,
          project,
        };
      } catch (err) {
        console.error(err);
        return {
          statuscode: 400,
          err,
        };
      }
    },
    updateProject: async (_: any, { input }: updateProjectInput) => {
      try {
        const { id, title, desc } = input;
        await getConnection()
          .createQueryBuilder()
          .update(Project, { title, desc })
          .where('id = :id', { id })
          .execute();

        return {
          statuscode: 200,
        };
      } catch (err) {
        console.error(err);
        return {
          statuscode: 400,
          err,
        };
      }
    },
    deleteProject: async (_: any, { id }: idInput) => {
      try {
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(Project)
          .where('id=:id', { id })
          .execute();
        return {
          statuscode: 200,
        };
      } catch (err) {
        console.error(err);
        return {
          statuscode: 400,
          err,
        };
      }
    },
  },
};

export default projectResolvers;
