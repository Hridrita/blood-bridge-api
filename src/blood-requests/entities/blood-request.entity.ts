import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
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

  @Column({ length: 11, nullable: true })
  contactNumber: string;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'requesterName' })
  requester: User;
}
