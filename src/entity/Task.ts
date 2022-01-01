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
import { SubTask } from './SubTask';
import { Comment } from './Comment';
import { User } from './User';
import { TagRelation } from './TagRelation';
import { Belong } from './Belong';
import { Like } from './Like';

@Entity('tasks')
export class Task extends BaseEntity {
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

  @ManyToOne((section) => Section, (section) => section.tasks)
  section: Section;

  @ManyToOne((section) => User, (user) => user.tasks)
  user: User;

  @OneToMany((type) => SubTask, (subtask) => subtask.task)
  subTasks: SubTask[];

  @OneToMany((type) => Comment, (comment) => comment.task)
  comments: Comment[];

  @OneToMany((type) => TagRelation, (tagRelation) => tagRelation.task)
  tagRelations: TagRelation[];

  @OneToMany((type) => Belong, (belong) => belong.task)
  belongs: Belong[];

  @OneToMany((type) => Like, (like) => like.task)
  likes: Like[];
}
