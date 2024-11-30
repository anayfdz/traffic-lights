import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('admin_users')
export class AdminUser {
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

  @Column({ type: 'enum', enum: ['super_admin', 'admin'], default: 'admin' })
  role: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP'})
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP'})
  updated_at: Date;
}
