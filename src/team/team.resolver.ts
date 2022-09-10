import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Team } from './entities/team.entity';
import { TeamsService } from './team.service';
import { OutputDto } from '../dto/output';
import { PaginationOutput } from '../common/dtos/pagination.dto';
import { FindTeamInputDto, FindTeamOutputDto } from './dtos/read_team.dto';
import {
  CreateTeamInputDto,
  CreateTeamOutputDto,
} from './dtos/create_team.dto';
import {
  UpdateTeamInputDto,
  UpdateTeamOutputDto,
} from './dtos/update_team.dto';
import { omit } from 'lodash';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamsService: TeamsService) {}

  @Query(() => FindTeamOutputDto)
  async team_read(@Args('input') query: FindTeamInputDto) {
    return this.teamsService.read({ where: query });
  }

  @Mutation(() => CreateTeamOutputDto)
  async team_create(@Args('input') input: CreateTeamInputDto) {
    return this.teamsService.create(input);
  }

  @Mutation(() => UpdateTeamOutputDto)
  async team_update(@Args('input') input: UpdateTeamInputDto) {
    return this.teamsService.update(input.teamId, omit(input, 'teamId'));
  }
}
