import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CloudinaryService } from '../../services/cloudinary/cloudinary.service';

@Injectable()
export class ResumeService {
    constructor(
        private prisma: PrismaService,
        private cloudinary: CloudinaryService,
    ) { }

    async getLatest() {
        return this.prisma.resume.findFirst({
            orderBy: { uploadedAt: 'desc' },
        });
    }

    async upload(file: Express.Multer.File) {
        const { pdfUrl, imageUrl } = await this.cloudinary.uploadPdf(file);

        return this.prisma.resume.create({
            data: {
                pdfUrl,
                imageUrl,
            },
        });
    }
}
