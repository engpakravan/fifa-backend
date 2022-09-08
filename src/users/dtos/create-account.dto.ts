import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { OutputDto } from '../../dto/output';

@InputType()
export class CreateAccountDto extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class CreateAccountOutputDto extends OutputDto {}
