import { Task } from '../tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ApiHideProperty()
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
