import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  // Khai báo Model 'User' để các Service trong Module này có thể Inject (sử dụng) được
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController], // Đăng ký Controller
  providers: [UsersService], // Đăng ký Service
  exports: [UsersService],
})
export class UsersModule {}
