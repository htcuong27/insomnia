import { Component, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundService, BackgroundType } from '../../../../core/services/background.service';

@Component({
    selector: 'app-background-selector',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './background-selector.html',
    styleUrl: './background-selector.scss'
})
export class BackgroundSelectorComponent {
    isOpen = model<'soundMixer' | 'musicPlayer' | 'backgroundSelector' | null>(null);
    activeTab = 'effects'; // 'effects' | 'minimal'

    constructor(public backgroundService: BackgroundService) { }

    toggleSelector() {
        this.isOpen.update(v => v === 'backgroundSelector' ? null : 'backgroundSelector');
    }

    setTab(tab: string) {
        this.activeTab = tab;
    }

    setBackground(type: BackgroundType) {
        this.backgroundService.setBackground(type);
    }
}
