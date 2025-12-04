import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePomodoroSessionDto } from './dto/pomodoro.dto';

@Injectable()
export class PomodoroService {
    constructor(private prisma: PrismaService) { }

    async createSession(userId: string, createSessionDto: CreatePomodoroSessionDto) {
        return this.prisma.pomodoroSession.create({
            data: {
                ...createSessionDto,
                userId,
            },
        });
    }

    async getUserStats(userId: string) {
        const sessions = await this.prisma.pomodoroSession.findMany({
            where: { userId },
            orderBy: { completedAt: 'desc' },
        });

        const totalSessions = sessions.length;
        const totalMinutes = sessions.reduce((acc, s) => acc + s.duration, 0) / 60;
        const workSessions = sessions.filter((s) => s.type === 'WORK').length;

        return {
            totalSessions,
            totalMinutes: Math.round(totalMinutes),
            workSessions,
            sessions: sessions.slice(0, 10), // Last 10 sessions
        };
    }
}
