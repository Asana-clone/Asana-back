import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Section } from './Section';
import { Tag } from './Tag';
import { Like } from './Like';
import { Task } from './Task';

@Entity('subTasks')
export class SubTask extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: true,
  })
  desc: string;

  @Column({
    nullable: true,
  })
  startDate: string;

  @Column({
    nullable: true,
  })
  dueDate: string;

  @Column({
    nullable: true,
    default: 'uncomplete',
  })
  status: string;

  @Column({
    nullable: true,
    default: 'default',
  })
  type: string;

  @Column({
    nullable: true,
  })
  process: string;

  @Column({
    nullable: true,
  })
  priority: string;

  @Column({
    nullable: false,
    default: 0,
  })
  likeNum: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany((type) => Comment, (comment) => comment.subTask)
  comments: Comment[];

  @OneToMany((type) => Tag, (tag) => tag.subTask)
  tags: Tag[];

  @OneToMany((type) => Like, (like) => like.subTask)
  likes: Like[];

  @OneToOne((type) => Task, (task) => task.subTask)
  task: Task;
}
