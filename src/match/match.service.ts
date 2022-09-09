import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud.service';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchService extends CrudService<Match> {
  constructor(
    @InjectRepository(Match) private readonly Match: Repository<Match>,
  ) {
    super(Match);
  }
}
