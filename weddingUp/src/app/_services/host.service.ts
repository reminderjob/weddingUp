import { Injectable } from '@angular/core';
import { Host } from '../_models/host';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HostService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

loadHost(): Observable<Host[]>  {
  let params = new HttpParams();
  params = params.append('name', localStorage.getItem('username'));
  return this.http
    .get<Host[]>(this.baseUrl + 'host/find_host/', {
      params
    });
}

}
