import { Injectable } from "@angular/core";
import { HttpService } from "../../../../core/services/http.service";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(private http: HttpService) { }

    getDashboardData() {
        return this.http.get('/admin/dashboard');
    }
}