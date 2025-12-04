import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    Request,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { FirebaseAuthGuard } from '../../auth/firebase-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogsService: BlogsService) { }

    @Get()
    findAll(@Query('published') published?: string) {
        const publishedBool = published === 'true' ? true : published === 'false' ? false : undefined;
        return this.blogsService.findAll(publishedBool);
    }

    @Get(':slug')
    async findBySlug(@Param('slug') slug: string) {
        // Increment view count
        await this.blogsService.incrementViewCount(slug);
        return this.blogsService.findBySlug(slug);
    }

    @Post()
    @UseGuards(FirebaseAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    create(@Request() req, @Body() createBlogDto: CreateBlogDto) {
        return this.blogsService.create(req.user.id, createBlogDto);
    }

    @Put(':id')
    @UseGuards(FirebaseAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
        return this.blogsService.update(id, updateBlogDto);
    }

    @Delete(':id')
    @UseGuards(FirebaseAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string) {
        return this.blogsService.remove(id);
    }
}
