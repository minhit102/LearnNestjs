import { IsOptional, IsInt, Min, Max, IsString } from 'class-validator';

export class GetUserParamsDto {
  @IsOptional()  // Nếu tham số này không bắt buộc
  @IsString()
  page?: string;

  @IsOptional()  // Nếu tham số này không bắt buộc
  @IsString()
  limit?: string;

  @IsOptional()  // Nếu tham số này không bắt buộc
  @IsString()
  sortBy: string;

  @IsOptional()  // Nếu tham số này không bắt buộc
  @IsString()
  order: string;
}