import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { Team } from '../entities/team.entity';
import { OutputDto } from '../../dto/output';

@InputType()
export class UpdateTeamInputDto extends PartialType(Team) {
  @Field(() => Number)
  teamId: number;
}

@ObjectType()
export class UpdateTeamOutputDto extends OutputDto {}
