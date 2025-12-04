import { IsString, IsArray, IsOptional, IsBoolean, IsInt, Min } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsArray()
    @IsString({ each: true })
    technologies: string[];

    @IsOptional()
    @IsString()
    githubUrl?: string;

    @IsOptional()
    @IsString()
    liveUrl?: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsBoolean()
    featured?: boolean;

    @IsOptional()
    @IsInt()
    @Min(0)
    order?: number;
}

export class UpdateProjectDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    technologies?: string[];

    @IsOptional()
    @IsString()
    githubUrl?: string;

    @IsOptional()
    @IsString()
    liveUrl?: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsBoolean()
    featured?: boolean;

    @IsOptional()
    @IsInt()
    @Min(0)
    order?: number;
}
