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
  tag: number | Tag;

  @ManyToOne((type) => Task, (task) => task.tagRelations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  task: number | Task;
}
