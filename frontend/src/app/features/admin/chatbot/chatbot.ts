import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotService, ChatSession, ChatMessage, BotConfig } from './services/chatbot.service';

@Component({
    selector: 'app-admin-chatbot',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './chatbot.html',
})
export class AdminChatbotComponent implements OnInit {
    private chatbotService = inject(ChatbotService);

    activeSessions: ChatSession[] = [];
    currentChat = {
        user: {
            name: 'Michael Foster',
            status: 'Interacting with Bot',
            avatar: 'MF'
        },
        messages: [] as ChatMessage[]
    };
    botConfig: BotConfig = {
        status: 'Online',
        responseTone: 'Professional & Concise',
        modelVersion: 'GPT-4 Turbo',
        stable: true
    };
    performance = {
        queries: { value: 0, change: '+6.5%' },
        avgTime: { value: '0s', change: '12%' },
        resolutionRate: { value: 0, max: 100 },
        sentimentScore: { value: 0, max: 5 }
    };
    knowledgeBase: any[] = [];
    loading = true;

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.loading = true;

        // Load active sessions
        this.chatbotService.getActiveSessions().subscribe({
            next: (sessions) => {
                this.activeSessions = sessions;
                if (sessions.length > 0) {
                    this.loadChatMessages(sessions[0].id);
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading sessions:', error);
                this.loadMockData();
                this.loading = false;
            }
        });

        // Load bot config
        this.chatbotService.getBotConfig().subscribe({
            next: (config) => this.botConfig = config,
            error: (error) => console.error('Error loading bot config:', error)
        });

        // Load performance metrics
        this.chatbotService.getPerformanceMetrics().subscribe({
            next: (metrics) => this.performance = metrics,
            error: (error) => console.error('Error loading performance:', error)
        });

        // Load knowledge base
        this.chatbotService.getKnowledgeBase().subscribe({
            next: (kb) => this.knowledgeBase = kb,
            error: (error) => console.error('Error loading knowledge base:', error)
        });
    }

    loadChatMessages(sessionId: number) {
        this.chatbotService.getChatMessages(sessionId).subscribe({
            next: (messages) => this.currentChat.messages = messages,
            error: (error) => console.error('Error loading messages:', error)
        });
    }

    loadMockData() {
        // Fallback mock data
        this.activeSessions = [
            { id: 1, name: 'Michael Foster', message: 'I need help with the API...', time: 'Now', avatar: 'MF', online: true },
            { id: 2, name: 'Lindsay Walton', message: 'Is the pricing updated?', time: '5m', avatar: 'LW', online: true },
            { id: 3, name: 'Guest #9213', message: 'Bot Session ended.', time: '1h', avatar: 'G', online: false, isGuest: true },
            { id: 4, name: 'Alex Johnson', message: 'Thanks for the info!', time: '2h', avatar: 'AJ', online: true }
        ];

        this.currentChat.messages = [
            { type: 'bot', text: 'Hello Michael! Welcome back. How can I assist you with your dashboard today?', time: 'Today, 10:23 AM' },
            { type: 'user', text: 'Hi, I\'m trying to integrate the new API key but I\'m getting a 403 error.', time: 'Now' },
            { type: 'bot', text: 'I see. A 403 error usually means permission', time: 'Now' }
        ];

        this.knowledgeBase = [
            { title: 'Pricing_2023.pdf', subtitle: 'Uploaded 4 days ago', icon: 'document', color: 'blue' },
            { title: 'Help Center FAQs', subtitle: 'Synced 4 hours ago', icon: 'help', color: 'orange' },
            { title: 'API Documentation', subtitle: 'Live Connection', icon: 'code', color: 'purple' }
        ];

        this.performance = {
            queries: { value: 1240, change: '+6.5%' },
            avgTime: { value: '45s', change: '12%' },
            resolutionRate: { value: 92, max: 100 },
            sentimentScore: { value: 4.8, max: 5 }
        };
    }
}
