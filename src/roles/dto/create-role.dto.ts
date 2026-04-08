import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'name không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'description không được để trống' })
  description: string;

  @IsNotEmpty({ message: 'isActive không được để trống' })
  @IsBoolean({ message: 'isActive có định dạng là boolean' })
  isActive: boolean;

  @IsNotEmpty({ message: 'permissions không được để trống' })
  @IsMongoId({ each: true, message: 'mỗi permission phải là mongo object id' })
  @IsArray({ message: 'permissions phải là định dạng array' })
  permissions: mongoose.Schema.Types.ObjectId[];
}
