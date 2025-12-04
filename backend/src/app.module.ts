import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ContactModule } from './modules/contact/contact.module';
import { ResumeModule } from './modules/resume/resume.module';
import { PomodoroModule } from './modules/pomodoro/pomodoro.module';
import { AdminModule } from './modules/admin/admin.module';
import { CloudinaryModule } from './services/cloudinary/cloudinary.module';
import { EmailModule } from './services/email/email.module';
import { FirebaseModule } from './services/firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    FirebaseModule,
    CloudinaryModule,
    EmailModule,
    AuthModule,
    ProjectsModule,
    BlogsModule,
    CommentsModule,
    ContactModule,
    ResumeModule,
    PomodoroModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
