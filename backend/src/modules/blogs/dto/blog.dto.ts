import { IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class CreateBlogDto {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    excerpt: string;

    @IsString()
    slug: string;

    @IsOptional()
    @IsString()
    coverImage?: string;

    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @IsOptional()
    @IsBoolean()
    published?: boolean;
}

export class UpdateBlogDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsString()
    excerpt?: string;

    @IsOptional()
    @IsString()
    slug?: string;

    @IsOptional()
    @IsString()
    coverImage?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @IsOptional()
    @IsBoolean()
    published?: boolean;
}
