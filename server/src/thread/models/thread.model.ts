import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { RoomModel } from '../../room/models/room.model';
import { UserModel } from '../../users/models/user.model';

@ObjectType()
export class ThreadModel {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => RoomModel)
  room: RoomModel;

  @Field(() => UserModel)
  user: UserModel;
}
