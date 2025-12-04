import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    constructor(private configService: ConfigService) {
        cloudinary.config({
            cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
        });
    }

    async uploadImage(file: Express.Multer.File, folder: string = 'insomnia'): Promise<string> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder,
                    resource_type: 'auto',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result!.secure_url);
                },
            );
            uploadStream.end(file.buffer);
        });
    }

    async uploadPdf(file: Express.Multer.File, folder: string = 'insomnia/resumes'): Promise<{ pdfUrl: string; imageUrl: string }> {
        // Upload PDF
        const pdfUrl = await new Promise<string>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder,
                    resource_type: 'raw',
                    format: 'pdf',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result!.secure_url);
                },
            );
            uploadStream.end(file.buffer);
        });

        // Convert first page to image (Cloudinary automatic transformation)
        const imageUrl = pdfUrl.replace('/raw/upload/', '/image/upload/f_jpg,pg_1/');

        return { pdfUrl, imageUrl };
    }

    async deleteResource(publicId: string): Promise<void> {
        await cloudinary.uploader.destroy(publicId);
    }
}
