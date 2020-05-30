import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'auth/login/', model).pipe(
      map((response: any) => {
        const host = response;
        if (host) {
          this.decodedToken = this.jwtHelper.decodeToken(host.access);
          localStorage.setItem('username',this.decodedToken['username']);
          localStorage.setItem('token', host.access);
          localStorage.setItem('refresh', host.refresh);
        }
      })
    );
  }

  refresh() {
    const payload = { refresh: localStorage.getItem('refresh') };
    return this.http.post(this.baseUrl + 'auth/refresh/', payload).pipe(
      map((response: any) => {
        const host = response;
        if (host) {
          localStorage.setItem('token', host.access);
        }
      })
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  register(host: any) {
    return this.http.post(this.baseUrl + 'host/create/', host);
  }
}
