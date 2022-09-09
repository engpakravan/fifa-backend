import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { Team } from '../entities/team.entity';
import { OutputDto } from '../../dto/output';

@InputType()
export class FindTeamInputDto extends PartialType(Team) {}

@ObjectType()
export class FindTeamOutputDto extends OutputDto {}
