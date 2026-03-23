import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class BloodRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bloodGroup: string;

  @Column()
  hospitalName: string;

  @Column()
  location: string;

  @Column()
  contactNumber: string;

  @Column({ default: 'pending' })
  status: string; 

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  requester: User; 
}