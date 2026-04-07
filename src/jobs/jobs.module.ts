import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from 'src/companies/schemas/company.schema';
import { Job, JobSchema } from './schema/job.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
