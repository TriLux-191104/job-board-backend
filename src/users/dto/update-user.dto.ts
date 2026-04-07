import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

// Kế thừa createUserDto vì sẽ giống nhau, không cho update password
export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
  @IsOptional()
  @IsMongoId({ message: '_id phải là chuẩn MongoDB ID' })
  _id?: string;
}
