import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Goal } from './Goal';
import { Project } from './Project';

@Entity('collaborators')
export class Collaborator extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne((type) => Goal, (goal) => goal.collaborators, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  goal: Goal;

  @ManyToOne((type) => User, (user) => user.collaborators, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  collaborator: User;
}
