import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomMembersUserModule } from '../room-members-user/room-members-user.module';
import { CategoryModule } from '../category/category.module';
import { SkillModule } from '../skill/skill.module';
import { UsersModule } from '../users/users.module';
import { Room } from './entities/room.entity';
import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    forwardRef(() => UsersModule),
    RoomMembersUserModule,
    SkillModule,
    CategoryModule,
  ],
  exports: [RoomService],
  providers: [RoomService, RoomResolver],
})
export class RoomModule {}
