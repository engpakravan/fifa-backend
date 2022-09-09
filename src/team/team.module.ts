import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamsService } from './team.service';
import { TeamResolver } from './team.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  providers: [TeamsService, TeamResolver],
})
export class TeamModule {}
