//Tarea dto

import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    name: string;

    @IsString()
    @MaxLength(200)
    @IsNotEmpty()
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    done: boolean;
}