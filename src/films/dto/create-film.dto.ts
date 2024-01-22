import { PartialType } from "@nestjs/mapped-types";
import { IsDate, IsISO31661Alpha2, IsISO8601, IsNotEmpty, IsOptional, IsString, isDateString, isNotEmpty } from "class-validator";

export class CreateFilmDTO
{
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    description?: string;

    @IsISO8601()
    @IsOptional()
    releaseDate: Date;

    @IsISO31661Alpha2()
    @IsOptional()
    country: string;

    @IsNotEmpty()
    @IsString()
    director: string;

    @IsOptional()
    @IsString()
    assistDirector: string[];

    @IsOptional()
    @IsString()
    cast: string[];

    @IsOptional()
    @IsString()
    producers: string[];

    @IsOptional()
    @IsString()
    execProducers: string[];

    @IsOptional()
    @IsString()
    writers: string[];

    @IsOptional()
    @IsString()
    artDirection: string[];

    @IsOptional()
    @IsString()
    composers: string[];

    @IsOptional()
    @IsString()
    songs: string[];

    @IsOptional()
    @IsString()
    sound: string[];

    @IsOptional()
    @IsString()
    poster: string;

    @IsOptional()
    @IsString()
    screenshots: string[];
}