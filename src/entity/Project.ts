import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectMember } from './ProjectMember';
import { Belong } from './Belong';
import { Section } from './Section';
import { Goal } from './Goal';

@Entity('projects')
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: true,
  })
  subject: string;

  @Column({
    nullable: true,
  })
  start: string;

  @Column({
    nullable: true,
  })
  end: string;

  @Column({
    nullable: true,
  })
  desc: string;

  @Column({
    nullable: true,
  })
  inviteCode: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany((type) => ProjectMember, (projectMember) => projectMember.project)
  projectMembers: ProjectMember[];

  @OneToMany((type) => Belong, (belong) => belong.project)
  belongs: Belong[];

  @OneToMany((type) => Section, (section) => section.project)
  sections: Section[];

  @OneToMany((type) => Goal, (goal) => goal.project)
  goals: Goal[];
}
