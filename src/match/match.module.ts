import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchResolver } from './match.resolver';
import { Match } from './entities/match.entity';
import { MatchService } from './match.service';
import { CrudService } from '../common/crud.service';
import { TeamsService } from '../team/team.service';
import { TeamModule } from '../team/team.module';
import { MatchReport } from './entities/match-report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match, MatchReport]),
    CrudService,
    TeamModule,
  ],
  providers: [MatchService, MatchResolver],
})
export class MatchModule {}
