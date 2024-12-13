import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Report } from '../reports/report.entity';
import { FileType } from 'src/domain/model/evidences/evidence';

@Entity('evidences')
export class Evidence {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Report, report => report.evidences)
  @JoinColumn({ name: 'report_id' })
  report: Report;

  @Column('text')
  file_path: string;

  @Column({ type: 'enum', enum: FileType })
  file_type: FileType;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' }) 
  uploaded_at: Date;
}