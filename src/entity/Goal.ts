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
import { Collaborator } from './Collaborator';
import { Project } from './Project';

@Entity('goals')
export class Goal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: true,
  })
  public: boolean;

  @Column({
    nullable: false,
  })
  initial: string;

  @Column({
    nullable: false,
  })
  current: number;

  @Column({
    nullable: false,
  })
  target: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany((type) => Collaborator, (collaborator) => collaborator.goal, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  collaborators: Collaborator[];

  @ManyToOne((type) => Project, (project) => project.goals, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  project: Project;
}
