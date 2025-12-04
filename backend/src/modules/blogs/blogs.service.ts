import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';

@Injectable()
export class BlogsService {
    constructor(private prisma: PrismaService) { }

    async findAll(published?: boolean) {
        return this.prisma.blog.findMany({
            where: published !== undefined ? { published } : {},
            include: {
                author: {
                    select: { name: true, picture: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findBySlug(slug: string) {
        return this.prisma.blog.findUnique({
            where: { slug },
            include: {
                author: {
                    select: { name: true, picture: true },
                },
                comments: {
                    where: { approved: true },
                    include: {
                        user: {
                            select: { name: true, picture: true },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
    }

    async incrementViewCount(slug: string) {
        return this.prisma.blog.update({
            where: { slug },
            data: {
                viewCount: {
                    increment: 1,
                },
            },
        });
    }

    async create(authorId: string, createBlogDto: CreateBlogDto) {
        return this.prisma.blog.create({
            data: {
                ...createBlogDto,
                authorId,
            },
        });
    }

    async update(id: string, updateBlogDto: UpdateBlogDto) {
        return this.prisma.blog.update({
            where: { id },
            data: updateBlogDto,
        });
    }

    async remove(id: string) {
        return this.prisma.blog.delete({
            where: { id },
        });
    }
}
