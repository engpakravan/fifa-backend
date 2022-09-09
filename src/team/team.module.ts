import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamsService } from './team.service';
import { TeamResolver } from './team.resolver';
import { CrudService } from '../common/crud.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), CrudService],
  providers: [TeamsService, TeamResolver],
})
export class TeamModule {}
