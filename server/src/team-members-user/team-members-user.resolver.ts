import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { TeamMembersUserService } from './team-members-user.service';
import {
  MemberState,
  TeamMembersUser,
} from './entities/team-members-user.entity';
import { UpdateTeamMembersUserInput } from './dto/update-team-members-user.input';

@Resolver(() => TeamMembersUser)
export class TeamMembersUserResolver {
  constructor(
    private readonly teamMembersUserService: TeamMembersUserService,
  ) {}

  @Mutation(() => TeamMembersUser)
  createTeamMembersUser(
    @Args('userId', { type: () => ID }) userId: number,
    @Args('userId', { type: () => Int }) teamId: number,
  ) {
    return this.teamMembersUserService.create(
      teamId,
      userId,
      MemberState.JOINING,
    );
  }

  @Query(() => [TeamMembersUser], { name: 'teamMembersUser' })
  findAll() {
    return this.teamMembersUserService.findAll();
  }

  @Query(() => TeamMembersUser, { name: 'teamMembersUser' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.teamMembersUserService.findOne(id);
  }

  @Mutation(() => TeamMembersUser)
  updateTeamMembersUser(
    @Args('updateTeamMembersUserInput')
    updateTeamMembersUserInput: UpdateTeamMembersUserInput,
  ) {
    return this.teamMembersUserService.update(
      updateTeamMembersUserInput.id,
      updateTeamMembersUserInput,
    );
  }

  @Mutation(() => TeamMembersUser)
  removeTeamMembersUser(
    @Args('id', { type: () => ID }) userId: number,
    @Args('id', { type: () => Int }) teamId: number,
  ) {
    return this.teamMembersUserService.remove(teamId, userId);
  }
}
