import { Column, Entity, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Team } from '../../team/entities/team.entity';

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

  @Column()
  @Field(() => Team)
  @ManyToMany(() => Team, { eager: true })
  @JoinTable()
  homeTeam: Team;

  @Column()
  @Field(() => Team)
  @ManyToMany(() => Team, { eager: true })
  @JoinTable()
  awayTeam: Team;
}
