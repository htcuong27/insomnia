import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createCommentDto: CreateCommentDto) {
        return this.prisma.comment.create({
            data: {
                ...createCommentDto,
                userId,
            },
        });
    }

    async findByBlog(blogId: string, includeUnapproved: boolean = false) {
        return this.prisma.comment.findMany({
            where: {
                blogId,
                ...(includeUnapproved ? {} : { approved: true }),
            },
            include: {
                user: {
                    select: { name: true, picture: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async approve(id: string) {
        return this.prisma.comment.update({
            where: { id },
            data: { approved: true },
        });
    }

    async remove(id: string) {
        return this.prisma.comment.delete({
            where: { id },
        });
    }
}
