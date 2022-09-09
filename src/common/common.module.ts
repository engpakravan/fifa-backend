import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';

@Module({
  imports: [CrudService],
  providers: [CrudService],
  exports: [CrudService],
})
export class CommonModule {}
