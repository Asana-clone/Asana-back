import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from './Tag';
import { Task } from './Task';
import { SubTask } from './SubTask';

@Entity('tagRelations')
export class TagRelation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne((type) => Tag, (tag) => tag.tagRelations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  tag: Tag;

  @ManyToOne((type) => Task, (task) => task.tagRelations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  task: Task;

  @ManyToOne((type) => SubTask, (subTask) => subTask.tagRelations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  subTask: SubTask;
}
