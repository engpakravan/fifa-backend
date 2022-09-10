import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchResolver } from './match.resolver';
import { Match } from './entities/match.entity';
import { MatchService } from './match.service';
import { CrudService } from '../common/crud.service';
import { TeamModule } from '../team/team.module';
import { MatchReport } from './entities/match-report.entity';
import { MatchReportService } from './match-report.service';
import { MatchReportResolver } from './match-report.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match, MatchReport]),
    CrudService,
    TeamModule,
  ],
  providers: [
    MatchService,
    MatchReportService,
    MatchReportResolver,
    MatchResolver,
  ],
})
export class MatchModule {}
