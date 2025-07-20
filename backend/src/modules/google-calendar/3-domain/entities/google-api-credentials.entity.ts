
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '@/modules/users/3-domain/entities/user.entity';

@Entity({ name: 'google_api_credentials' })
export class GoogleApiCredentials {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  accessToken: string;

  @Column({ type: 'text', nullable: true })
  refreshToken: string;

  @Column({ type: 'bigint' })
  expiryDate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, user => user.googleApiCredentials)
  @JoinColumn()
  user: User;

  @Column()
  userId: string;
}
