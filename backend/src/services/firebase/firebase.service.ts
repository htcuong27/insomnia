import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import * as serviceAccount from './../../../firebase.json';

@Injectable()
export class FirebaseService implements OnModuleInit {
    private app: admin.app.App;

    constructor(private configService: ConfigService) { }

    onModuleInit() {
        this.app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        });
    }

    getAuth(): admin.auth.Auth {
        return this.app.auth();
    }

    async verifyIdToken(token: string): Promise<admin.auth.DecodedIdToken> {
        return this.getAuth().verifyIdToken(token);
    }

    async getUser(uid: string): Promise<admin.auth.UserRecord> {
        return this.getAuth().getUser(uid);
    }
}
