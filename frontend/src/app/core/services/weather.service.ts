import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';

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
    private http = inject(HttpClient);
    private apiUrl = environment.weatherApiUrl;
    weather = signal({ isDay: false, isRaining: false });

    fetchWeather(lat: number, lon: number) {
        const url = this.apiUrl.replace('{lat}', lat.toString()).replace('{lon}', lon.toString());
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
