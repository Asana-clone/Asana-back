import { User } from '../entity/User';

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

export interface createProjectInput {
  input: {
    title: string;
    desc: string;
  };
}

export interface updateProjectInput {
  input: {
    id: number;
    title: string;
    desc: string;
  };
}

export interface createSectionInput {
  input: { projectId: number; title: string };
}
export interface updateSectionInput {
  input: { id: number; title: string };
}

export interface updateTaskInput {
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
export interface createTaskInput {
  input: {
    title: string;
    desc?: string;
    userId?: number;
    startDate?: string;
    dueDate?: string;
    status?: string;
    type?: string;
    process?: string;
    priority?: string;
    sectionId: number;
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
