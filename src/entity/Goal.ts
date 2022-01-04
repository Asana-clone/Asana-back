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
import { Project } from './Project';

@Entity('goals')
export class Goal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: true,
  })
  startDate: string;

  @Column({
    nullable: true,
  })
  dueDate: string;

  @Column({
    nullable: false,
  })
  percentage: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne((type) => Project, (project) => project.goals, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  project: number | Project;
}
