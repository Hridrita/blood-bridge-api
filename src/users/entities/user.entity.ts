import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum UserRole {
  DONOR = 'donor',
  RECIPIENT = 'recipient',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  bloodGroup: string; // যেমন: A+, B-, O+

  @Column()
  area: string; // যেমন: Dhanmondi, Banani

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.DONOR,
  })
  role: UserRole;

  @Column({ type: 'timestamp', nullable: true })
  lastDonationDate: Date;

  @Column({ default: true })
  isAvailable: boolean;
}