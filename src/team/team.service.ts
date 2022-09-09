import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CrudService } from '../common/crud.service';

@Injectable()
export class TeamsService extends CrudService<Team> {
  constructor(
    @InjectRepository(Team) private readonly teams: Repository<Team>,
  ) {
    super(teams);
  }
}
