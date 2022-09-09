import { DeepPartial, FindConditions, Repository } from 'typeorm';
import { OutputDto } from '../dto/output';
import { PaginationOutput } from './dtos/pagination.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class CrudService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async create(args: DeepPartial<T>): Promise<OutputDto> {
    try {
      await this.repository.save(this.repository.create(args) as any);
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  async read(query: Partial<T>): Promise<PaginationOutput & { results?: T }> {
    try {
      return {
        ok: true,
        results: await this.repository.findOne(query),
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  async readMany(
    query: Partial<T>,
  ): Promise<PaginationOutput & { results?: Array<T> }> {
    try {
      return {
        ok: true,
        results: await this.repository.find(query),
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  async update(
    criteria: FindConditions<T>,
    partialChange: QueryDeepPartialEntity<T>,
  ): Promise<PaginationOutput & { results?: T }> {
    try {
      const result = await this.repository.findOne(criteria);
      if (!result)
        return {
          ok: false,
          error: 'NotFounded',
        };
      await this.repository.update(criteria, partialChange);
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }
}
