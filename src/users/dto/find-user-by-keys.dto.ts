import { IsOptional } from "class-validator";

export class FindUserByKeysDto {
  @IsOptional() 
  key: string;
}