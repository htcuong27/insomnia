import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../../services/email/email.service';
import { CreateContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
    constructor(
        private prisma: PrismaService,
        private emailService: EmailService,
    ) { }

    async create(createContactDto: CreateContactDto) {
        // Save to database
        const contact = await this.prisma.contact.create({
            data: createContactDto,
        });

        // Send email to admin
        await this.emailService.sendContactEmail(
            createContactDto.email,
            createContactDto.name,
            createContactDto.message,
        );

        return contact;
    }

    async findAll() {
        return this.prisma.contact.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async markAsReplied(id: string) {
        return this.prisma.contact.update({
            where: { id },
            data: { replied: true },
        });
    }
}
