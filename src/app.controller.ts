import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get() // => api(restful)
  @Render('home')
  handleHomePage() {
    console.log('check port = ', this.configService.get<string>('PORT'));
  }
}
