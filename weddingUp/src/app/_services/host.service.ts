import { Injectable } from '@angular/core';
import { Host } from '../_models/host';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HostService {
  currentHost: Host;
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  loadHost(): Observable<Host> {
    return this.http.get<Host>(this.baseUrl + 'host/find_host/').pipe(
      map((response) => {
        this.currentHost = response[0];
        localStorage.setItem('host', JSON.stringify(this.currentHost));
        return this.currentHost;
      })
    );
  }
}
