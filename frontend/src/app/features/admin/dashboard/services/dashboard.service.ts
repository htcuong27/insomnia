import { Injectable } from "@angular/core";
import { HttpService } from "../../../../core/services/http.service";
import { Observable } from "rxjs";
import { DashboardData } from "../models/dashboard";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(private http: HttpService) { }

    getDashboardData(): Observable<DashboardData> {
        return this.http.get<DashboardData>('admin/dashboard');
    }
}