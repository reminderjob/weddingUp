import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Content } from '../_models/content';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  baseUrl = environment.apiUrl;
  content: Content;

  constructor(private http: HttpClient) {
  }

  loadPage(the_host: string): Observable<Content>  {
    let params = new HttpParams();
    params = params.append('the_host', the_host);
    return this.http
      .get<Content>(this.baseUrl + 'host/public_content/', {
        params
      }).pipe(
        map((response) => {
          this.content = response[0];
          return this.content;
        })
      );
  }
}
