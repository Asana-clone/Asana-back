import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Task } from './Task';
import { SubTask } from './SubTask';

@Entity('likes')
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.likes)
  user: User;

  @ManyToOne((type) => Task, (task) => task.likes)
  task: Task;

  @ManyToOne((type) => SubTask, (subTask) => subTask.likes)
  subTask: SubTask;
}
