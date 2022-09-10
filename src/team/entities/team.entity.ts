import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Match } from '../../match/entities/match.entity';

@InputType('TeamInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Team extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsString()
  name: string;

  @Column()
  @Field(() => String)
  @IsString()
  description: string;

  @Column()
  @Field(() => String)
  @IsString()
  avatarUrl: string;

  @Field(() => [Team])
  @OneToMany(() => Team, (team) => team.homeTeam)
  @JoinColumn()
  homeTeam: Team[];

  @Field(() => [Team])
  @OneToMany(() => Team, (team) => team.awayTeam)
  @JoinColumn()
  awayTeam: Team[];
}
