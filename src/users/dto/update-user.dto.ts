import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    username?: string;
  
    @IsString()
    @IsOptional()
    password?: string;
  
    @IsString()
    @IsOptional()
    address?: string;
  
    @IsBoolean()
    @IsOptional()
    isAdmin?: boolean;
  }
  
