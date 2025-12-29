import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService, BlogPost } from './services/blog.service';
import { FormsModule } from '@angular/forms';
import { RichTextEditorComponent } from '../../../shared/components/rich-text-editor/rich-text-editor';

@Component({
    selector: 'app-admin-blog',
    standalone: true,
    imports: [CommonModule, FormsModule, RichTextEditorComponent],
    templateUrl: './blog.html',
})
export class AdminBlogComponent implements OnInit {
    stats = {
        total: 0,
        published: 0,
        drafts: 0
    };

    articles: BlogPost[] = [];

    newPost: Partial<BlogPost> = {
        title: '',
        category: 'Technology',
        author: { name: 'Admin', picture: 'A' },
        content: ''
    };

    private blogService = inject(BlogService);

    ngOnInit() {
        this.loadPosts();
    }

    loadPosts() {
        this.blogService.getPosts().subscribe({
            next: (posts) => {
                this.articles = posts;
                this.calculateStats(posts);
            },
            error: (err) => console.error('Error loading posts:', err)
        });
    }

    calculateStats(posts: BlogPost[]) {
        this.stats = {
            total: posts.length,
            published: posts.filter(p => p.status === 'Published').length,
            drafts: posts.filter(p => p.status === 'Draft').length
        };
    }

    createPost() {
        if (!this.newPost.title || !this.newPost.content) {
            alert('Please fill in title and content');
            return;
        }

        const post: Partial<BlogPost> = {
            ...this.newPost,
            status: 'Published',
            publishedDate: new Date().toLocaleDateString(),
            icon: '📝',
            iconBg: 'blue'
        };

        this.blogService.createPost(post).subscribe({
            next: (createdPost) => {
                console.log('Post created:', createdPost);
                alert('Post published successfully!');
                // Reset form or navigate
                this.resetForm();
                this.loadPosts(); // Refresh list
            },
            error: (err) => {
                console.error('Error creating post:', err);

                alert('Failed to publish post. Please check your connection.');
            }
        });
    }

    saveAsDraft() {
        const post: Partial<BlogPost> = {
            ...this.newPost,
            status: 'Draft',
            publishedDate: '-',
            icon: '📝',
            iconBg: 'gray'
        };

        this.blogService.createPost(post).subscribe({
            next: (createdPost) => {
                console.log('Draft saved:', createdPost);
                alert('Draft saved successfully!');
                this.resetForm();
                this.loadPosts();
            },
            error: (err) => {
                console.error('Error saving draft:', err);
                alert('Failed to save draft. Please check your connection.');
            }
        });
    }

    resetForm() {
        this.newPost = {
            title: '',
            category: 'Technology',
            author: { name: 'Admin', picture: 'A' },
            content: ''
        };
    }
}
