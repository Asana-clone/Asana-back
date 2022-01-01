import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Projectmember } from './Projectmember';
import { Belong } from './Belong';
import { Section } from './Section';

@Entity('projects')
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  subject: string;

  @Column({
    nullable: false,
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

  @OneToMany((type) => Projectmember, (projectmember) => projectmember.project)
  projectmembers: Projectmember[];

  @OneToMany((type) => Belong, (belong) => belong.project)
  belongs: Belong[];

  @OneToMany((type) => Section, (section) => section.project)
  sections: Section[];
}
