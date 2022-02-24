import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class F1StatsService {

  constructor(private http: HttpClient) { }

  private URL: string = 'https://ergast.com/api/f1/';

  getCurrentDrivers(): Observable<any> {
    let urlDrivers = this.URL + 'current/driverStandings.json';
    return this.http.get(urlDrivers);
  }

  getCurrentConstructors(): Observable<any> {
    let urlCosntructors = this.URL + 'current/constructorStandings.json';
    return this.http.get(urlCosntructors);
  }
}
