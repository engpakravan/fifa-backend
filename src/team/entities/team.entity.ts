import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType('TeamInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Team extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsString()
  name: string;

  @Column()
  @Field(() => String)
  @IsString()
  description: string;

  @Column()
  @Field(() => String)
  @IsString()
  avatarUrl: string;
}
