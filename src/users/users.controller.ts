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
  @ResponseMessage('Create a new user !')
  async create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
    const newUser = await this.usersService.create(createUserDto, user);
    // Lấy dữ liệu từ req.body và ép thành CreateUserDto
    // @Body: req.body
    return {
      _id: newUser?._id,
      createdAt: newUser?.createdAt,
    };
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

  @Public()
  @Get(':id')
  @ResponseMessage('Fetch user by ID !')
  async findOne(@Param('id') id: string) {
    const foundUser = await this.usersService.findOne(id);
    // const id:string = req.params.id;
    return foundUser;
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    const updatedUser = await this.usersService.update(updateUserDto, user);
    return updatedUser;
  }

  @Delete(':id')
  @ResponseMessage('Delete a user !')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }
}
