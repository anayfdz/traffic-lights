import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Report } from '../reports/report.entity';
import { Otp } from '../otps/otps.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  last_name: string;

  @Column({ type: 'varchar', unique: true, length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', unique: true, length: 255 })
  nickname: string;

  @Column({ type: 'enum', enum: ['pending_validation', 'validated'], default: 'pending_validation' })
  status: string;

  @CreateDateColumn(({ default: () => 'CURRENT_TIMESTAMP'}))
  created_at: Date;

  @UpdateDateColumn(({ default: () => 'CURRENT_TIMESTAMP'}))
  updated_at: Date;

  @OneToMany(() => Report, report => report.user)
  reports: Report[];

  @OneToMany(() => Otp, otp => otp.user)
  otps: Otp[];
}
