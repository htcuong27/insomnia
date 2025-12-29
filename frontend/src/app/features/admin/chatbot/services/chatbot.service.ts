import { Injectable, inject } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { Observable } from 'rxjs';

export interface ChatSession {
    id: number;
    name: string;
    message: string;
    time: string;
    avatar: string;
    online: boolean;
    isGuest?: boolean;
}

export interface ChatMessage {
    type: 'bot' | 'user';
    text: string;
    time: string;
}

export interface BotConfig {
    status: string;
    responseTone: string;
    modelVersion: string;
    stable: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ChatbotService {
    private http = inject(HttpService);

    getActiveSessions(): Observable<ChatSession[]> {
        return this.http.get<ChatSession[]>('admin/chatbot/sessions');
    }

    getChatMessages(sessionId: number): Observable<ChatMessage[]> {
        return this.http.get<ChatMessage[]>(`admin/chatbot/sessions/${sessionId}/messages`);
    }

    sendMessage(sessionId: number, message: string): Observable<ChatMessage> {
        return this.http.post<ChatMessage>(`admin/chatbot/sessions/${sessionId}/messages`, { message });
    }

    getBotConfig(): Observable<BotConfig> {
        return this.http.get<BotConfig>('admin/chatbot/config');
    }

    updateBotConfig(config: Partial<BotConfig>): Observable<BotConfig> {
        return this.http.put<BotConfig>('admin/chatbot/config', config);
    }

    getPerformanceMetrics(): Observable<any> {
        return this.http.get('admin/chatbot/performance');
    }

    getKnowledgeBase(): Observable<any[]> {
        return this.http.get<any[]>('admin/chatbot/knowledge-base');
    }
}
