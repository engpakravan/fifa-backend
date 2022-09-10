import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Match } from './entities/Match.entity';
import {
  CreateMatchInputDto,
  CreateMatchOutputDto,
} from './dtos/create_match.dto';
import { MatchReportService } from './match-report.service';
import {
  CreateMatchReportInputDto,
  CreateMatchReportOutputDto,
} from './dtos/create_match-report.dto';

@Resolver(() => Match)
export class MatchReportResolver {
  constructor(private readonly matchReportService: MatchReportService) {}

  // @Query(() => FindMatchOutputDto)
  // async match_read(@Args('input') query: FindMatchInputDto) {
  //   return this.MatchService.read<Match>({
  //     where: query,
  //     relations: ['homeTeam', 'awayTeam'],
  //   });
  // }
  //
  // @Query(() => FindMatchesOutputDto)
  // match_readMany(@Args('input') query: FindMatchesInputDto) {
  //   return this.MatchService.readMany({
  //     where: query,
  //     relations: ['homeTeam', 'awayTeam'],
  //   });
  // }
  //
  @Mutation(() => CreateMatchReportOutputDto)
  async matchReport_create(@Args('input') input: CreateMatchReportInputDto) {
    return this.matchReportService.createMatchReport(input);
  }
  //
  // @Mutation(() => UpdateMatchOutputDto)
  // async match_update(@Args('input') input: UpdateMatchInputDto) {
  //   return this.MatchService.update(input.MatchId, omit(input, 'MatchId'));
  // }
}
