import { IsAlpha, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateHeroDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    name: string;

    @IsString()
    type: string;

    @IsString()
    image: string;
}