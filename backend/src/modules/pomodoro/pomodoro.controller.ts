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
import { FirebaseAuthGuard } from '../../auth/firebase-auth.guard';

@Controller('pomodoro')
export class PomodoroController {
    constructor(private readonly pomodoroService: PomodoroService) { }

    @Post('session')
    @UseGuards(FirebaseAuthGuard)
    createSession(@Request() req, @Body() createSessionDto: CreatePomodoroSessionDto) {
        return this.pomodoroService.createSession(req.user.id, createSessionDto);
    }

    @Get('stats')
    @UseGuards(FirebaseAuthGuard)
    getUserStats(@Request() req) {
        return this.pomodoroService.getUserStats(req.user.id);
    }
}
