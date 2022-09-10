import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { OutputDto } from '../../dto/output';
import { Match } from '../entities/match.entity';
import { PaginationOutput } from '../../common/dtos/pagination.dto';

@InputType()
export class FindMatchesInputDto extends PartialType(Match) {}

@ObjectType()
export class FindMatchesOutputDto extends PaginationOutput {
  @Field(() => [Match])
  results: Match[];
}
