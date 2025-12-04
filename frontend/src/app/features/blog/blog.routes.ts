import { Routes } from "@angular/router";
import { BlogDetailComponent } from "./blog-detail/blog-detail";
import { BlogListComponent } from "./blog-list/blog-list";

export const blogRoutes: Routes = [
    {
        path: '',
        component: BlogListComponent
    },
    {
        path: ':slug',
        component: BlogDetailComponent
    }
]