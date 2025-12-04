import { IsInt, Min, IsEnum } from 'class-validator';
import { PomodoroType } from '@prisma/client';

export class CreatePomodoroSessionDto {
    @IsInt()
    @Min(0)
    duration: number;

    @IsEnum(PomodoroType)
    type: PomodoroType;
}
