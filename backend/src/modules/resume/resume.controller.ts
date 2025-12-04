import {
    Controller,
    Get,
    Post,
    UseGuards,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResumeService } from './resume.service';
import { FirebaseAuthGuard } from '../../auth/firebase-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('resume')
export class ResumeController {
    constructor(private readonly resumeService: ResumeService) { }

    @Get()
    getLatest() {
        return this.resumeService.getLatest();
    }

    @Post('upload')
    @UseGuards(FirebaseAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file: Express.Multer.File) {
        return this.resumeService.upload(file);
    }
}
