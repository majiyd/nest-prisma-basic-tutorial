import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  isForRent: boolean;

  @IsInt()
  userId: number;
}
