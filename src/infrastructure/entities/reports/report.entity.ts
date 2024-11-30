import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { TrafficLight } from '../traffic-lights/trafficLight.entity';
import { Evidence } from '../evidences/evidences.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => TrafficLight, trafficLight => trafficLight.reports, { nullable: true })
  @JoinColumn({ name: 'traffic_light_id' })
  trafficLight: TrafficLight;

  @Column('text', { nullable: true })
  description: string;

  @Column('enum', { enum: ['funcionando', 'dañado', 'intermitente'] })
  status: string;

  @Column('text', { nullable: true })
  comments: string;

  @Column('timestamp')
  reported_at: Date;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Evidence, (evidence) => evidence.report)
  evidences: Evidence[];
}

