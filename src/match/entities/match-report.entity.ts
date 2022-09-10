import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import { Team } from '../../team/entities/team.entity';
import { Match } from './match.entity';
import { UserRole } from '../../users/entities/user.entity';

export enum MatchReportEnum {
  YellowCard = 'YELLOW_CARD',
  RedCard = 'RED_CARD',
  ExtraTime = 'EXTRA_TIME',
  Goal = 'GOAL',
  JimmyJumping = 'JIMMY_JUMPING',
  News = 'news',
  Injures = 'INJURES',
}

registerEnumType(MatchReportEnum, { name: 'reportType' });

@InputType('MatchReportInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MatchReport extends CoreEntity {
  @Column({ type: 'enum', enum: MatchReportEnum })
  @Field(() => MatchReportEnum)
  @IsEnum(MatchReportEnum)
  reportType: MatchReportEnum;

  @Field(() => Match, { nullable: true })
  @ManyToOne(() => Match, (match) => match.matchReport, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  match: Match;
}
