import { Injectable, inject } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { Observable, map } from 'rxjs';

export interface BlogPost {
    id: string;
    title: string;
    category: string;
    author: { name: string; picture: string };
    status: 'Published' | 'Draft';
    publishedDate: string;
    content?: string;
    icon?: string;
    iconBg?: string;
}

export interface BlogStats {
    total: number;
    published: number;
    drafts: number;
}

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private http = inject(HttpService);

    getStats(): Observable<BlogStats> {
        return this.http.get<BlogStats>('admin/dashboard/stats');
    }

    getPosts(): Observable<BlogPost[]> {
        return this.http.get<any[]>('blogs').pipe(
            map(posts => posts.map(post => ({
                id: post.id,
                title: post.title,
                category: post.tags?.[0] || 'General',
                author: post.author || { name: 'Unknown', picture: '' },
                status: post.published ? 'Published' : 'Draft',
                publishedDate: post.createdAt ? new Date(post.createdAt).toLocaleDateString() : '-',
                content: post.content,
                icon: post.coverImage || '📝',
                iconBg: 'blue'
            } as BlogPost)))
        );
    }

    getPost(id: string): Observable<BlogPost> {
        return this.http.get<BlogPost>(`blogs/${id}`);
    }

    createPost(post: Partial<BlogPost>): Observable<BlogPost> {
        const payload = {
            title: post.title,
            content: post.content,
            excerpt: post.content ? post.content.substring(0, 100) + '...' : '',
            slug: this.generateSlug(post.title || ''),
            tags: post.category ? [post.category] : [],
            published: post.status === 'Published',
            coverImage: post.icon // using icon as coverImage placeholder
        };
        return this.http.post<BlogPost>('blogs', payload);
    }

    updatePost(id: string, post: Partial<BlogPost>): Observable<BlogPost> {
        return this.http.put<BlogPost>(`blogs/${id}`, post);
    }

    deletePost(id: string): Observable<void> {
        return this.http.delete<void>(`blogs/${id}`);
    }

    publishPost(id: string): Observable<BlogPost> {
        return this.http.put<BlogPost>(`blogs/${id}`, { published: true });
    }

    private generateSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }
}
