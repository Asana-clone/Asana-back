import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './Project';
import { User } from './User';
import { Authority } from '../constants';

@Entity('projectMembers')
export class ProjectMember extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  authority: Authority;

  @Column({
    nullable: true,
  })
  projectRole: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne((type) => Project, (project) => project.projectMembers)
  project: number | Project;

  @ManyToOne((type) => User, (user) => user.projectMembers)
  user: number | User;
}
