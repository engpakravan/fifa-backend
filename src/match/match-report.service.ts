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
import { MatchReport } from './entities/match-report.entity';
import {
  CreateMatchReportInputDto,
  CreateMatchReportOutputDto,
} from './dtos/create_match-report.dto';

@Injectable()
export class MatchReportService {
  constructor(
    @InjectRepository(MatchReport)
    private readonly MatchReport: Repository<MatchReport>,
    @InjectRepository(Match)
    private readonly match: Repository<Match>,
  ) {}

  async createMatchReport(
    input: CreateMatchReportInputDto,
  ): Promise<CreateMatchReportOutputDto> {
    try {
      const match = await this.match.findOneOrFail({
        where: { id: input.matchId },
      });
      if (match)
        return {
          ok: false,
          error: 'Match Not Founded',
        };
      await this.MatchReport.save(this.MatchReport.create(input));
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
    // try {
    //   const [homeTeam, awayTeam] = await Promise.all([
    //     this.teamsService.read<Team, Team>({ where: { id: input.homeTeamId } }),
    //     this.teamsService.read<Team, Team>({ where: { id: input.awayTeamId } }),
    //   ]);
    //   await this.Match.save(
    //     this.Match.create({
    //       ...input,
    //       homeTeam: homeTeam.results as any,
    //       awayTeam: awayTeam.results as any,
    //     }),
    //   );
    //   return {
    //     ok: true,
    //   };
    // } catch (error) {
    //   return {
    //     ok: false,
    //     error,
    //   };
    // }
  }
}
