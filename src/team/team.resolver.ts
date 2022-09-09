import { Query, Resolver } from '@nestjs/graphql';
import { Team } from './entities/team.entity';
import { TeamsService } from './team.service';
import { OutputDto } from '../dto/output';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamsService: TeamsService) {}

  @Query(() => OutputDto)
  async team_find() {
    return this.teamsService.create({
      name: 'Mahdi',
      description: 'Mahdi Team is Fantastic',
      avatarUrl: 'AVATAR.PNG',
    });
  }
}
