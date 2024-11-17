import { IsString, IsEmail, IsEnum, IsArray, ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import { Role } from 'src/auth/role.enum'; // Make sure the Role enum is imported correctly

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEnum(Role) 
  role: Role;
}
