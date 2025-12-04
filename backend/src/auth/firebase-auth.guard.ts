import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from '../services/firebase/firebase.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
    constructor(
        private firebaseService: FirebaseService,
        private prismaService: PrismaService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const decodedToken = await this.firebaseService.verifyIdToken(token);

            // Find or create user in database
            let user = await this.prismaService.user.findUnique({
                where: { firebaseUid: decodedToken.uid },
            });

            if (!user) {
                // Create user if doesn't exist
                const firebaseUser = await this.firebaseService.getUser(decodedToken.uid);
                user = await this.prismaService.user.create({
                    data: {
                        firebaseUid: decodedToken.uid,
                        email: firebaseUser.email || 'anonymous@sample.com',
                        name: firebaseUser.displayName || 'Anonymous',
                        picture: firebaseUser.photoURL,
                        role: decodedToken.uid.startsWith('anon-') ? 'GUEST' : 'USER',
                    },
                });
            }

            request.user = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
