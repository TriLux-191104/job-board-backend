import { MailerService } from '@nestjs-modules/mailer/dist';
import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { Job, JobDocument } from 'src/jobs/schema/job.entity';
import {
  Subscriber,
  SubscriberDocument,
} from 'src/subscribers/schemas/subscriber.entity';
import { SubscribersService } from 'src/subscribers/subscribers.service';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,

    private readonly mailerService: MailerService,

    @InjectModel(Subscriber.name)
    private subscriberModel: SoftDeleteModel<SubscriberDocument>,

    @InjectModel(Job.name)
    private jobModel: SoftDeleteModel<JobDocument>,
  ) {}

  @Get()
  @Public()
  @ResponseMessage('Test email')
  @Cron('0 10 0 * * 0') // 0:10 am every sunday
  async handleTestEmail() {
    const subscribers = await this.subscriberModel.find({});

    for (const subs of subscribers) {
      const subsSkills = subs.skills;
      const jobWithMatchingSkills = await this.jobModel.find({
        skills: { $in: subsSkills },
      });
      if (jobWithMatchingSkills?.length) {
        const jobs = jobWithMatchingSkills.map((item) => ({
          name: item.name,
          company: item.company.name,
          salary: `${item.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ',
          skill: item.skills,
        }));

        await this.mailerService.sendMail({
          to: subs.email,
          from: '"Support Team" <support@example.com>', // override default from
          subject: 'Welcome to Nice App! Confirm your Email',
          template: 'new-job',
          context: {
            receiver: subs.name,
            job: jobs,
          },
        });
      }
    }
  }
}
