import { IsString } from 'class-validator';

export class CreateCommentDto {
    @IsString()
    blogId: string;

    @IsString()
    content: string;
}
