import { IsNotEmpty, IsString } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    text: string;
}
