import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-admin-photos',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './photos.html',
})
export class AdminPhotosComponent implements OnInit {
    albums = [
        {
            id: 1,
            name: 'Marketing Assets',
            itemCount: 124,
            modifiedDate: '4 days ago',
            thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400',
            gradient: 'from-orange-400 to-red-500'
        },
        {
            id: 2,
            name: 'Product Shoots',
            itemCount: 45,
            modifiedDate: '1d ago',
            thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
            gradient: 'from-green-600 to-teal-700'
        },
        {
            id: 3,
            name: 'Team Events',
            itemCount: 89,
            modifiedDate: '3d ago',
            thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
            gradient: 'from-amber-400 to-orange-500'
        }
    ];

    photos = [
        { id: 1, url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', selected: false },
        { id: 2, url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400', selected: true },
        { id: 3, url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', selected: false },
        { id: 4, url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', selected: false },
        { id: 5, url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', selected: false, loading: true },
        { id: 6, url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400', selected: false },
        { id: 7, url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', selected: false }
    ];

    selectedCount = 1;
    totalPhotos = 256;

    ngOnInit() { }

    toggleSelection(photo: any) {
        photo.selected = !photo.selected;
        this.selectedCount = this.photos.filter(p => p.selected).length;
    }

    selectAll() {
        const allSelected = this.photos.every(p => p.selected);
        this.photos.forEach(p => p.selected = !allSelected);
        this.selectedCount = this.photos.filter(p => p.selected).length;
    }
}
