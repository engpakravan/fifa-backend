import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Team } from '../../team/entities/team.entity';
import { MatchReport, MatchReportEnum } from './match-report.entity';

@InputType('MatchInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Match extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsString()
  stadiumName: string;

  @Column()
  @Field(() => String)
  @IsString()
  locationName: string;

  @Field(() => Team, { nullable: true })
  @ManyToOne(() => Team, (match) => match.homeTeam, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  homeTeam: Team;

  @Field(() => Team, { nullable: true })
  @ManyToOne(() => Team, (match) => match.awayTeam, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  awayTeam: Team;

  @Field(() => [MatchReportEnum])
  @OneToMany(() => MatchReport, (matchReport) => matchReport.match)
  @JoinColumn()
  matchReport: MatchReport[];
}
