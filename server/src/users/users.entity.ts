import { Team } from 'src/teams/teams.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  introduction: string;

  @Column({ nullable: true })
  githubId: string;

  @Column({ nullable: true })
  twitterId: string;

  @OneToMany(() => Team, (team) => team.owner)
  teams?: Team[];
}
