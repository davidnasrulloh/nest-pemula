import { IsOptional, IsString, isAlpha } from "class-validator";

export class UpdateHeroDto {
    @IsOptional()
    name: string;

    @IsOptional()
    type: string;

    @IsOptional()
    image: string;
}