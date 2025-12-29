import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-admin-contact',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './contact.html',
})
export class AdminContactComponent implements OnInit {
    contacts = [
        {
            id: 1,
            name: 'Michael Foster',
            role: 'Product Designer',
            email: 'michael.foster@example.com',
            phone: '+1 (555) 123-4567',
            company: 'Google Inc.',
            position: 'Administrator',
            status: 'Active',
            avatar: 'MF',
            avatarColor: 'from-blue-500 to-purple-600'
        },
        {
            id: 2,
            name: 'Lindsay Walton',
            role: 'Front-end Developer',
            email: 'lindsay.walton@example.com',
            phone: '+1 (555) 987-6543',
            company: 'Meta Platforms',
            position: 'Member',
            status: 'Active',
            avatar: 'LW',
            avatarColor: 'from-pink-500 to-orange-600'
        },
        {
            id: 3,
            name: 'Courtney Henry',
            role: 'Marketing Manager',
            email: 'courtney.henry@example.com',
            phone: '+1 (555) 234-5678',
            company: 'Stripe',
            position: 'Editor',
            status: 'Inactive',
            avatar: 'CW',
            avatarColor: 'from-cyan-500 to-blue-600',
            initials: 'CW'
        },
        {
            id: 4,
            name: 'Tom Wilson',
            role: 'Sales Director',
            email: 'tom.wilson@example.com',
            phone: '+1 (555) 555-0199',
            company: 'Amazon',
            position: 'Member',
            status: 'Active',
            avatar: 'TW',
            avatarColor: 'from-orange-500 to-red-600',
            initials: 'TW'
        },
        {
            id: 5,
            name: 'Sarah Jenkins',
            role: 'Content Strategist',
            email: 's.jenkins@example.com',
            phone: '+44 20 7123 4567',
            company: 'BBC',
            position: 'Contributor',
            status: 'Away',
            avatar: '📝',
            avatarColor: 'from-yellow-500 to-orange-600',
            isEmoji: true
        }
    ];

    ngOnInit() { }
}
