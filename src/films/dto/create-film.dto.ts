import { PartialType } from "@nestjs/mapped-types";
import { IsDate, IsISO8601, IsNotEmpty, IsOptional, IsString, isDateString, isISO8601, isNotEmpty } from "class-validator";

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

    @IsOptional()
    @IsString()
    poster: string;

    @IsOptional()
    @IsString()
    screenshots: string[];
}

