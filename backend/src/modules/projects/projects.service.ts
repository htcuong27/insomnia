import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.project.findMany({
            orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        });
    }

    async findOne(id: string) {
        return this.prisma.project.findUnique({
            where: { id },
        });
    }

    async create(createProjectDto: CreateProjectDto) {
        return this.prisma.project.create({
            data: createProjectDto,
        });
    }

    async update(id: string, updateProjectDto: UpdateProjectDto) {
        return this.prisma.project.update({
            where: { id },
            data: updateProjectDto,
        });
    }

    async remove(id: string) {
        return this.prisma.project.delete({
            where: { id },
        });
    }
}
