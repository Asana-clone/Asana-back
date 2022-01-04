import { getRepository, getConnection } from 'typeorm';
import {
  idInput,
  projectInput,
  inviteProjectInput,
  projectMemberInput,
  ctx,
} from '../interface';
import { Project } from './../../entity/Project';
import { ProjectMember } from './../../entity/ProjectMember';
import { User } from './../../entity/User';
import { Authority } from '../../constant';

const projectResolvers = {
  Query: {
    getProjectDetail: async (
      _: any,
      { id }: idInput,
      { loggedInUser }: ctx,
    ) => {
      try {
        if (!loggedInUser) {
          throw new Error('로그인되어있지 않습니다.');
        }
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
        return {
          statuscode: 500,
          err,
        };
      }
    },
    getProjectList: async (_: any, __: any, { loggedInUser }: ctx) => {
      try {
        if (!loggedInUser) {
          throw new Error('로그인되어있지 않습니다.');
        }
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
        return {
          statuscode: 500,
          err,
        };
      }
    },
  },
  Mutation: {
    createProject: async (
      _: any,
      { input }: projectInput,
      { loggedInUser }: ctx,
    ) => {
      if (!loggedInUser) {
        throw new Error('로그인되어있지 않습니다.');
      }
      try {
        const { title, subject, start, end, desc } = input;
        //TODO inviteCode 생성
        const inviteCode = '1';
        const project = await getRepository(Project).save({
          title,
          subject,
          start,
          end,
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
    updateProject: async (
      _: any,
      { input }: projectInput,
      { loggedInUser }: ctx,
    ) => {
      try {
        if (!loggedInUser) {
          throw new Error('로그인되어있지 않습니다.');
        }
        const { id, title, subject, start, end, desc } = input;
        await getConnection()
          .createQueryBuilder()
          .update(Project, {
            id,
            title,
            subject,
            start,
            end,
            desc,
          })
          .where('id = :id', { id })
          .execute();
        return {
          statuscode: 200,
        };
      } catch (err) {
        return {
          statuscode: 400,
          err,
        };
      }
    },
    deleteProject: async (_: any, { id }: idInput, { loggedInUser }: ctx) => {
      try {
        if (!loggedInUser) {
          throw new Error('로그인되어있지 않습니다.');
        }
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
        return {
          statuscode: 400,
          err,
        };
      }
    },
    inviteProject: async (
      _: any,
      { input }: inviteProjectInput,
      { loggedInUser }: ctx,
    ) => {
      try {
        if (!loggedInUser) {
          throw new Error('로그인되어있지 않습니다.');
        }
        const { email, projectId } = input;
        const userId: number = await getRepository(User)
          .findOne({
            where: {
              email,
            },
          })
          .then((user) => user.id);

        await getRepository(ProjectMember).save({
          user: userId,
          project: projectId,
          authority: Authority.canComment,
        });
        return {
          statuscode: 200,
        };
      } catch (err) {
        return {
          statuscode: 400,
          err,
        };
      }
    },
    updateAuthority: async (
      _: any,
      { input }: projectMemberInput,
      { loggedInUser }: ctx,
    ) => {
      try {
        if (!loggedInUser) {
          throw new Error('로그인되어있지 않습니다.');
        }
        const { email, projectId, authority } = input;
        const userId: number = await getRepository(User)
          .findOne({
            where: {
              email,
            },
          })
          .then((user) => user.id);
        await getConnection()
          .createQueryBuilder()
          .update(ProjectMember, {
            user: userId,
            project: projectId,
            authority,
          })
          .where('projectMembers.userId = :userId', { userId })
          .execute();
        return {
          statuscode: 200,
        };
      } catch (err) {
        return {
          statuscode: 400,
          err,
        };
      }
    },
  },
};

export default projectResolvers;
