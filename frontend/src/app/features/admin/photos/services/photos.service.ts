import { Injectable, inject } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { Observable } from 'rxjs';

export interface Album {
    id: number;
    name: string;
    itemCount: number;
    modifiedDate: string;
    thumbnail?: string;
    gradient?: string;
}

export interface Photo {
    id: number;
    url: string;
    albumId?: number;
    selected?: boolean;
    loading?: boolean;
    uploadedAt?: string;
}

@Injectable({
    providedIn: 'root'
})
export class PhotosService {
    private http = inject(HttpService);

    getAlbums(): Observable<Album[]> {
        return this.http.get<Album[]>('admin/photos/albums');
    }

    getAlbum(id: number): Observable<Album> {
        return this.http.get<Album>(`admin/photos/albums/${id}`);
    }

    createAlbum(album: Partial<Album>): Observable<Album> {
        return this.http.post<Album>('admin/photos/albums', album);
    }

    updateAlbum(id: number, album: Partial<Album>): Observable<Album> {
        return this.http.put<Album>(`admin/photos/albums/${id}`, album);
    }

    deleteAlbum(id: number): Observable<void> {
        return this.http.delete<void>(`admin/photos/albums/${id}`);
    }

    getPhotos(albumId?: number): Observable<Photo[]> {
        let endpoint = 'admin/photos';
        if (albumId) {
            endpoint += `?albumId=${albumId}`;
        }
        return this.http.get<Photo[]>(endpoint);
    }

    uploadPhoto(file: File, albumId?: number): Observable<Photo> {
        const formData = new FormData();
        formData.append('file', file);
        if (albumId) {
            formData.append('albumId', albumId.toString());
        }
        return this.http.post<Photo>('admin/photos/upload', formData);
    }

    deletePhotos(photoIds: number[]): Observable<void> {
        return this.http.post<void>('admin/photos/delete', { photoIds });
    }

    movePhotos(photoIds: number[], targetAlbumId: number): Observable<void> {
        return this.http.post<void>('admin/photos/move', { photoIds, targetAlbumId });
    }
}
