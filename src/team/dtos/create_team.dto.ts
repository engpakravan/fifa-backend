import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { Team } from '../entities/team.entity';
import { OutputDto } from '../../dto/output';

@InputType()
export class CreateTeamInputDto extends PartialType(Team) {}

@ObjectType()
export class CreateTeamOutputDto extends OutputDto {}
