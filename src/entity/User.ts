import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './Comment';
import { Task } from './Task';
import { ProjectMember } from './ProjectMember';
import { Like } from './Like';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: true,
  })
  role: string;

  @Column({
    nullable: true,
  })
  department: string;

  @Column({
    nullable: true,
  })
  about: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany((type) => Comment, (comment) => comment.user, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @OneToMany((type) => ProjectMember, (projectMember) => projectMember.user, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  projectMembers: ProjectMember[];

  @OneToMany((type) => Task, (task) => task.user, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  tasks: Task[];

  @OneToMany((type) => Like, (like) => like.user, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  likes: Like[];
}
