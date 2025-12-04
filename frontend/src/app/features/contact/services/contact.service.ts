import { Injectable } from "@angular/core";
import { HttpService } from "../../../core/services/http.service";
import { inject } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private http = inject(HttpService);

    submitContact(data: { name: string; email: string; message: string }) {
        return this.http.post('/contact', data);
    }
}