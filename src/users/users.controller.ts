import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';

@Controller('users') // // Định nghĩa tiền tố đường dẫn là /users
export class UsersController {
  // Tự động khởi tạo và sử dụng UsersService thông qua Dependency Injection (DI)
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseMessage('Create a user !')
  create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
    // Lấy dữ liệu từ req.body và ép thành CreateUserDto
    // @Body: req.body
    return this.usersService.create(createUserDto, user);
  }

  @Get()
  @Public()
  @ResponseMessage('Fetch list users !')
  findAll(
    @Query('page') currentPage: string, // const currentPage = req.query.page;
    @Query('limit') limit: string, // const limit = req.query.limit;
    @Query() qs: string,
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage('Fetch list users !')
  @Public()
  findOne(@Param('id') id: string) {
    // const id:string = req.params.id;
    return this.usersService.findOne(id);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    return this.usersService.update(updateUserDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete a user !')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }
}
