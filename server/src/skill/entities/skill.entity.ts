import { Team } from '../../teams/entities/teams.entity';
import { User } from '../../users/entities/users.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @ManyToMany(() => Team, (team) => team.skills)
  teams: Team[];

  @ManyToMany(() => User, (user) => user.skills)
  users: User[];
}
