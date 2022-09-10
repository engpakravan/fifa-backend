import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Match } from '../entities/Match.entity';
import { OutputDto } from '../../dto/output';
import { MatchReport } from '../entities/match-report.entity';

@InputType()
export class CreateMatchReportInputDto extends PickType(MatchReport, [
  'reportType',
]) {
  @Field(() => String)
  matchId: string;
}

@ObjectType()
export class CreateMatchReportOutputDto extends OutputDto {}
