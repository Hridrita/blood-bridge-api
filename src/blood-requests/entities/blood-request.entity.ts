import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
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

  @Column({ length: 11 , nullable: true}) // ডাটাবেজ লেভেলে লেন্থ সেট করা
  contactNumber: string;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  // এখানে requesterId-র বদলে সরাসরি ইউজার অবজেক্ট আসবে
  @ManyToOne(() => User, { eager: true }) // eager: true দিলে সবসময় নামসহ ডাটা আসবে
  @JoinColumn({ name: 'requesterName' }) // কলামের নাম requesterId থেকে বদলে requesterName করা হলো
  requester: User;
}