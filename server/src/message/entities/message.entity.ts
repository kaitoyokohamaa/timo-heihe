import { Thread } from '../../thread/entities/thread.entity';
import { User } from '../../users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Thread)
  thread: Thread;

  @ManyToOne(() => User)
  user: User;
}
