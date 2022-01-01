import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: true,
  })
  role: string;

  @Column({
    nullable: true,
  })
  department: string;

  @Column({
    nullable: true,
  })
  about: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
