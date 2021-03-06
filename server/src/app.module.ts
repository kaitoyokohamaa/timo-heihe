import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/users.entity';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { CategoryModule } from './category/category.module';
import { SkillModule } from './skill/skill.module';
import { Team } from './teams/entities/teams.entity';
import { Category } from './category/entities/category.entity';
import { Skill } from './skill/entities/skill.entity';
import { TeamMembersUserModule } from './team-members-user/team-members-user.module';
import { TeamMembersUser } from './team-members-user/entities/team-members-user.entity';
import { Room } from './room/entities/room.entity';
import { ThreadModule } from './thread/thread.module';
import { RoomModule } from './room/room.module';
import { MessageModule } from './message/message.module';
import { Thread } from './thread/entities/thread.entity';
import { Message } from './message/entities/message.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
    }),
    GraphQLModule.forRoot({
      include: [
        UsersModule,
        TeamsModule,
        CategoryModule,
        SkillModule,
        RoomModule,
        ThreadModule,
        MessageModule,
      ],
      playground: true,
      autoSchemaFile: 'schema.graphql',
      sortSchema: true,
      context: ({ req }) => ({ headers: req && req.headers }),
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'timoheihe',
      password: 'postgres',
      database: 'postgres',
      entities: [
        User,
        Team,
        Category,
        Skill,
        TeamMembersUser,
        Room,
        Thread,
        Message,
      ],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    TeamsModule,
    CategoryModule,
    SkillModule,
    TeamMembersUserModule,
    RoomModule,
    ThreadModule,
    MessageModule,
  ],
})
export class AppModule {}
