import {
  IsString,
  IsArray,
  IsUrl,
  IsDateString,
  ValidateNested,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CharacterLocationDto {
  @IsString()
  name: string;

  @IsString()
  url: string;
}

export class CharacterDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  status: string;

  @IsString()
  species: string;

  @IsString()
  type: string;

  @IsString()
  gender: string;

  @ValidateNested()
  @Type(() => CharacterLocationDto)
  origin: CharacterLocationDto;

  @ValidateNested()
  @Type(() => CharacterLocationDto)
  location: CharacterLocationDto;

  @IsUrl()
  image: string;

  @IsArray()
  @IsString({ each: true })
  episode: string[];

  @IsUrl()
  url: string;

  @IsOptional()
  @IsDateString()
  created?: string;
}

export class DeleteDto {
  @IsNumber()
  id: number;
}
