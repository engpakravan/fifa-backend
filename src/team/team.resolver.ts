import { Query, Resolver } from '@nestjs/graphql';
import { Team } from './entities/team.entity';
import { TeamsService } from './team.service';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamsService: TeamsService) {}

  @Query(() => String)
  team_find() {
    return 'Hi';
  }
}
