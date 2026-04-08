import { IsNotEmpty, IsEmail, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { PartialType } from '@nestjs/mapped-types'; // Hoặc dùng '@nestjs/swagger' nếu bạn có cài Swagger
import { CreateResumeDto } from './create-resume.dto'; // Nhớ trỏ đúng đường dẫn file của bạn

class UpdatedBy {
  @IsNotEmpty()
  _id: Types.ObjectId;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

class History {
  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  updatedAt: Date;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => UpdatedBy)
  updatedBy: UpdatedBy;
}

export class UpdateResumeDto extends PartialType(CreateResumeDto) {
  @IsNotEmpty({ message: 'history không được để trống' })
  @IsArray({ message: 'history có định dạng là array' })
  @ValidateNested()
  @Type(() => History)
  history: History[];
}
