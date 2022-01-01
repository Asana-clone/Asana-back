import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Task } from './Task';
import { SubTask } from './SubTask';

@Entity('comments')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user!: User;

  @ManyToOne((type) => Task, (task) => task.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  task: Task;

  @ManyToOne((type) => SubTask, (subTask) => subTask.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  subTask: SubTask;
}
