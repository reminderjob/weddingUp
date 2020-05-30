import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HostService } from '../_services/host.service';
import { Host } from '../_models/host';

@Injectable()
export class HostResolver implements Resolve<Host[]> {
  constructor(
    private hostService: HostService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Host[]> {
    return this.hostService.loadHost().pipe(
      catchError((error) => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['']);
        return of(null);
      })
    );
  }
}
