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

@Entity('comments')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  contents: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user!: number | User;

  @ManyToOne((type) => Task, (task) => task.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  task: number | Task;
}
