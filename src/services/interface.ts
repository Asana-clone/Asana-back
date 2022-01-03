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
    role: string;
    password: string;
    department: string;
    email: string;
    about: string;
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

export interface sectionInput {
  input: { id: number; title: string };
}
