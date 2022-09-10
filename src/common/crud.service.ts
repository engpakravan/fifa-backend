import { DeepPartial, FindConditions, Repository } from 'typeorm';
import { OutputDto } from '../dto/output';
import { PaginationOutput } from './dtos/pagination.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { ObjectID } from 'typeorm/driver/mongodb/typings';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

type CriteriaType<T> = string | number | FindConditions<T>;

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

  async read<T, I = T>(
    options?: FindOneOptions<T>,
  ): Promise<PaginationOutput & { results?: T }> {
    try {
      return {
        ok: true,
        results: (await this.repository.findOne(
          options as FindOneOptions,
        )) as any,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  async readMany(
    query: FindManyOptions<T>,
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
    criteria: CriteriaType<T>,
    partialChange: QueryDeepPartialEntity<T>,
  ): Promise<PaginationOutput & { results?: T }> {
    try {
      // const result = await this.repository.findOne(criteria);
      // if (!result)
      //   return {
      //     ok: false,
      //     error: 'NotFounded',
      //   };
      console.log({ criteria, partialChange });
      await this.repository.update(criteria, { ...partialChange });
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
