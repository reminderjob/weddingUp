import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ContentService } from '../_services/content.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Injectable()
export class ContentResolver implements Resolve<Content> {
  constructor(
    private contentService: ContentService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Content> {
    return this.contentService.loadPage(route.params['the_host']).pipe(
      catchError((error) => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['']);
        return of(null);
      })
    );
  }
}
