import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface WeatherResponse {
    current: {
        weather_code: number;
        is_day: number;
    };
}

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    weather = signal<{ isDay: boolean; isRaining: boolean } | null>(null);

    constructor(private http: HttpClient) { }

    fetchWeather(lat: number, lon: number) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,is_day`;

        return this.http.get<WeatherResponse>(url).pipe(
            map(response => {
                const isDay = response.current.is_day === 1;
                // WMO Weather interpretation codes (WW)
                // 51, 53, 55: Drizzle
                // 61, 63, 65: Rain
                // 80, 81, 82: Rain showers
                // 95, 96, 99: Thunderstorm
                const code = response.current.weather_code;
                const isRaining = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code);

                return { isDay, isRaining };
            })
        );
    }
}
