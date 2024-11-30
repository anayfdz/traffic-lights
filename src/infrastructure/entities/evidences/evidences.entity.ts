import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity('evidences')
export class Evidence {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Report, report => report.evidences)
  @JoinColumn({ name: 'report_id' })
  report: Report;

  @Column('text')
  file_path: string;

  @Column({ type: 'enum', enum: ['image', 'video'] })
  file_type: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' }) 
  uploaded_at: Date;
}