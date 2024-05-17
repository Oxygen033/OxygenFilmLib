import { IsNotEmpty, IsOptional, IsString, IsISO8601 } from 'class-validator';

export class CreateFilmDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsISO8601()
  @IsOptional()
  releaseDate: Date;

  @IsOptional()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  director: string;

  @IsOptional()
  @IsString()
  assistDirector: string;

  @IsOptional()
  @IsString()
  cast: string;

  @IsOptional()
  @IsString()
  producers: string;

  @IsOptional()
  @IsString()
  execProducers: string;

  @IsOptional()
  @IsString()
  writers: string;

  @IsOptional()
  @IsString()
  artDirection: string;

  @IsOptional()
  @IsString()
  composers: string;

  @IsOptional()
  @IsString()
  songs: string;

  @IsOptional()
  @IsString()
  sound: string;

  @IsOptional()
  @IsString()
  genres: string;

  @IsOptional()
  @IsString()
  poster: string;

  @IsOptional()
  @IsString()
  screenshots: string;
}
