import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Match } from './entities/Match.entity';
import { FindMatchInputDto, FindMatchOutputDto } from './dtos/read_match.dto';
import {
  CreateMatchInputDto,
  CreateMatchOutputDto,
} from './dtos/create_match.dto';
import {
  UpdateMatchInputDto,
  UpdateMatchOutputDto,
} from './dtos/update_match.dto';
import { omit } from 'lodash';
import { MatchService } from './match.service';

@Resolver(() => Match)
export class MatchResolver {
  constructor(private readonly MatchService: MatchService) {}

  @Query(() => FindMatchOutputDto)
  async match_read(@Args('input') query: FindMatchInputDto) {
    return this.MatchService.read(query);
  }

  @Mutation(() => CreateMatchOutputDto)
  async match_create(@Args('input') input: CreateMatchInputDto) {
    return this.MatchService.create(input);
  }

  @Mutation(() => UpdateMatchOutputDto)
  async match_update(@Args('input') input: UpdateMatchInputDto) {
    return this.MatchService.update(input.MatchId, omit(input, 'MatchId'));
  }
}
