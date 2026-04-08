// data transfer object
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  isDate,
  IsEmail,
  isNotEmpty,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}

export class CreateJobDto {
  @IsNotEmpty({ message: 'name khong duoc de trong' })
  name: string;

  @IsNotEmpty({ message: 'skills khong duoc de trong' })
  @IsArray({ message: 'skills cos dinh dang array' })
  @IsString({ each: true, message: 'skill dinh dang la string' })
  skills: string[];

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @IsNotEmpty({ message: 'salary khong duoc de trong' })
  salary: number;

  @IsNotEmpty({ message: 'quantity khong duoc de trong' })
  quantity: number;

  @IsNotEmpty({ message: 'level khong duoc de trong' })
  level: string;

  @IsNotEmpty({ message: 'description khong duoc de trong' })
  description: string;

  @IsNotEmpty({ message: 'startDate khong duoc de trong' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'startDate co dinh dang la Date' })
  startDate: Date;

  @IsNotEmpty({ message: 'endDate khong duoc de trong' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'endDate co dinh dang la Date' })
  endDate: Date;

  @IsNotEmpty({ message: 'isActive khong duoc de trong' })
  @IsBoolean({ message: 'isActive co dinh dang la Boolean' })
  isActive: boolean;

  @IsNotEmpty({ message: 'location khong duoc de trong' })
  location: string;
}
