import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { RoomModel } from '../../room/models/room.model';
import { CategoryModel } from '../../category/models/category.model';
import { SkillModel } from '../../skill/models/skill.model';
import { UserModel } from '../../users/models/user.model';
import { MemberState } from '../entities/team-members-user.entity';
import { TeamMemberModel } from './team-member.model';

@ObjectType()
export class UserMemberModel {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  icon?: string;

  @Field()
  description: string;

  @Field(() => [SkillModel], { nullable: true })
  skills?: SkillModel[];

  @Field(() => UserModel)
  owner: UserModel;

  @Field(() => [TeamMemberModel], { nullable: true })
  members?: TeamMemberModel[];

  @Field(() => [CategoryModel])
  categories: CategoryModel[];

  @Field({ nullable: true })
  repositoryUrl?: string;

  @Field(() => Int)
  recruitNumbers?: number;

  @Field()
  isRequired: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => MemberState)
  memberState: MemberState;

  @Field(() => [RoomModel], { nullable: true })
  rooms: RoomModel[];
}
