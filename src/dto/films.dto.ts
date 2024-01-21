import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class CreateFilmDTO
{
    @IsNotEmpty()
    title: string;

    @IsOptional()
    description?: string;

    @IsDate()
    @IsOptional()
    releaseDate: Date;

    @IsOptional()
    poster: string;

    @IsOptional()
    screenshots: string[];
}