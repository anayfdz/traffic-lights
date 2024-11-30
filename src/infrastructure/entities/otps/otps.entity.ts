import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('otps')
export class Otp {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.otps)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('varchar', { length: 6 })
  otp_code: string;

  @Column('timestamp')
  expires_at: Date;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
