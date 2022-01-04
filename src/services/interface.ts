import { User } from '../entity/User';
import { Authority } from '../constant';

export interface signInput {
  email: string;
  password: string;
}
export interface ctx {
  loggedInUser: User;
}

export interface userInput {
  input: {
    name: string;
    role?: string;
    password: string;
    department?: string;
    email: string;
    about?: string;
  };
}

export interface idInput {
  id: number;
}

export interface projectInput {
  input: {
    id?: number;
    title?: string;
    desc?: string;
    subject?: string;
    start?: string;
    end?: string;
  };
}

export interface inviteProjectInput {
  input: {
    projectId: number;
    email?: string;
  };
}

export interface projectMemberInput {
  input: {
    projectId: number;
    email?: string;
    authority?: Authority;
    projectRole?: string;
  };
}

export interface sectionInput {
  input: { id: number; title: string };
}

export interface taskInput {
  input: {
    id: number;
    title: string;
    desc?: string;
    userId?: number;
    startDate?: string;
    dueDate?: string;
    status?: string;
    type?: string;
    process?: string;
    priority?: string;
    sectionId?: number;
  };
}

export interface createCommentInput {
  input: {
    taskId: number;
    contents: string;
  };
}
export interface updateCommentInput {
  input: {
    id: number;
    contents: string;
  };
}

export interface createGoalInput {
  input: {
    name: string;
    projectId?: number;
    startDate?: string;
    dueDate?: string;
    percentage?: number;
  };
}
export interface updateGoalInput {
  input: {
    id: number;
    projectId?: number;
    name?: string;
    startDate?: string;
    dueDate?: string;
    percentage?: number;
  };
}
