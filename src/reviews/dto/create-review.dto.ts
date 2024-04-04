import { IsNotEmpty, IsString } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty()
    @IsString()
    header: string;

    @IsNotEmpty()
    @IsString()
    text: string
}
