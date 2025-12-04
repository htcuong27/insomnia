import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../../services/email/email.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {
    constructor(
        private prisma: PrismaService,
        private emailService: EmailService,
        private configService: ConfigService,
    ) { }

    async getDashboardStats() {
        // Database connection check
        const dbConnected = await this.checkDatabaseConnection();

        // Email service check
        const emailConnected = await this.emailService.testConnection();

        // Count statistics
        const [projectsCount, blogsCount, contactsCount, usersCount] = await Promise.all([
            this.prisma.project.count(),
            this.prisma.blog.count(),
            this.prisma.contact.count(),
            this.prisma.user.count(),
        ]);

        // Pending items
        const [pendingComments, unreadContacts] = await Promise.all([
            this.prisma.comment.count({ where: { approved: false } }),
            this.prisma.contact.count({ where: { replied: false } }),
        ]);

        return {
            services: {
                database: {
                    connected: dbConnected,
                    url: this.configService.get('DATABASE_URL')?.replace(/\/\/.*@/, '//***@') || 'Not configured',
                },
                email: {
                    connected: emailConnected,
                    adminEmail: this.configService.get('ADMIN_EMAIL'),
                },
                firebase: {
                    connected: true, // If app loaded, Firebase is connected
                    projectId: this.configService.get('FIREBASE_PROJECT_ID'),
                },
                cloudinary: {
                    connected: !!this.configService.get('CLOUDINARY_CLOUD_NAME'),
                    cloudName: this.configService.get('CLOUDINARY_CLOUD_NAME'),
                },
            },
            stats: {
                projects: projectsCount,
                blogs: blogsCount,
                contacts: contactsCount,
                users: usersCount,
            },
            pending: {
                comments: pendingComments,
                contacts: unreadContacts,
            },
        };
    }

    private async checkDatabaseConnection(): Promise<boolean> {
        try {
            await this.prisma.$runCommandRaw({ ping: 1 });
            return true;
        } catch (error) {
            return false;
        }
    }
}
