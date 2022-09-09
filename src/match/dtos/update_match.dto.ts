import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { Match } from '../entities/Match.entity';
import { OutputDto } from '../../dto/output';

@InputType()
export class UpdateMatchInputDto extends PartialType(Match) {
  @Field(() => Number)
  MatchId: number;
}

@ObjectType()
export class UpdateMatchOutputDto extends OutputDto {}
