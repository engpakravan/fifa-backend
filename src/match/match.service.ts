import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud.service';
import { Match } from './entities/match.entity';
import {
  CreateMatchInputDto,
  CreateMatchOutputDto,
} from './dtos/create_match.dto';
import { TeamsService } from '../team/team.service';
import { Team } from '../team/entities/team.entity';

@Injectable()
export class MatchService extends CrudService<Match> {
  constructor(
    @InjectRepository(Match) private readonly Match: Repository<Match>,
    private readonly teamsService: TeamsService,
  ) {
    super(Match);
  }

  async createMatch(input: CreateMatchInputDto): Promise<CreateMatchOutputDto> {
    try {
      const [homeTeam, awayTeam] = await Promise.all([
        this.teamsService.read<Team, Team>(input.homeTeamId),
        this.teamsService.read<Team, Team>(input.awayTeamId),
      ]);
      await this.Match.save(
        this.Match.create({
          ...input,
          homeTeam: homeTeam.results as any,
          awayTeam: awayTeam.results as any,
        }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
