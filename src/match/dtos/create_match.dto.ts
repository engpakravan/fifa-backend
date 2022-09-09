import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { Match } from '../entities/Match.entity';
import { OutputDto } from '../../dto/output';

@InputType()
export class CreateMatchInputDto extends PartialType(Match) {}

@ObjectType()
export class CreateMatchOutputDto extends OutputDto {}
