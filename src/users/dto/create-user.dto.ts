import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
  
  @IsString()
  address: string;

  @IsBoolean()
  @IsOptional() // Không bắt buộc vì sẽ có giá trị mặc định là false
  isAdmin?: boolean;
}
