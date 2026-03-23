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
  bloodGroup: string;

  @Column()
  area: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.DONOR,
  })
  role: UserRole;

  @Column({ nullable: true }) // যদি কলামটি খালি রাখা যায়
contactNumber: string;

  @Column({ default: true })
  isAvailable: boolean;
}
