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
import { Subtask } from './SubTask';

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

  @OneToOne((type) => Subtask, (subtask) => subtask.task)
  subtask: Subtask;
}
