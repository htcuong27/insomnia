import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Request,
} from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { CreatePomodoroSessionDto } from './dto/pomodoro.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pomodoro')
export class PomodoroController {
    constructor(private readonly pomodoroService: PomodoroService) { }

    @Post('session')
    @UseGuards(JwtAuthGuard)
    createSession(@Request() req, @Body() createSessionDto: CreatePomodoroSessionDto) {
        return this.pomodoroService.createSession(req.user.userId, createSessionDto);
    }

    @Get('stats')
    @UseGuards(JwtAuthGuard)
    getUserStats(@Request() req) {
        return this.pomodoroService.getUserStats(req.user.userId);
    }
}
