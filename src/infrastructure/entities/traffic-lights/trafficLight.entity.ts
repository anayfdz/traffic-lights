import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Point } from 'typeorm';
import { Report } from '../reports/report.entity'

@Entity('traffic_lights')
export class TrafficLight {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column('enum', { enum: ['vehicular', 'peatonal', 'mixto'] })
  type: string;

  @Column('varchar', { length: 255, nullable: true })
  department: string;

  @Column('varchar', { length: 255, nullable: true })
  province: string;

  @Column('varchar', { length: 255, nullable: true })
  district: string;
  
  @Column('geometry', { nullable: true, spatialFeatureType: 'Point', srid: 4326 })
  location: Point;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Report, (report) => report.trafficLight)
  reports: Report[];
}
