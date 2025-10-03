import { UserEntity } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity({ name: 'reports' })
export class ReportEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  source: string;

  @Column()
  amount: number;

  @Column({
    type: 'enum',
    enum: ReportType,
    default: ReportType.EXPENSE,
  })
  type: ReportType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.reports, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
