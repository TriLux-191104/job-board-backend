// data transfer object
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'Name khong duoc de trong!' })
  name: string;

  @IsNotEmpty({ message: 'Address khong duoc de trong!' })
  address: string;

  @IsString({ message: 'Description khong duoc de trong!' })
  description: string;
}
