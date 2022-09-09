import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { OutputDto } from '../../dto/output';
import { Match } from '../entities/match.entity';

@InputType()
export class FindMatchInputDto extends PartialType(Match) {}

@ObjectType()
export class FindMatchOutputDto extends OutputDto {}
