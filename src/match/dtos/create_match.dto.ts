import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Match } from '../entities/Match.entity';
import { OutputDto } from '../../dto/output';

@InputType()
export class CreateMatchInputDto extends PickType(Match, [
  'locationName',
  'stadiumName',
]) {
  @Field(() => String)
  homeTeamId: string;

  @Field(() => String)
  awayTeamId: string;
}

@ObjectType()
export class CreateMatchOutputDto extends OutputDto {}
