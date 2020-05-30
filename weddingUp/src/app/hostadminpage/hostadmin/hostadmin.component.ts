import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { UserIdleService } from 'angular-user-idle';
import { Host } from '../../_models/host';

@Component({
  selector: 'app-hostadmin',
  templateUrl: './hostadmin.component.html',
  styleUrls: ['./hostadmin.component.css'],
})
export class HostadminComponent implements OnInit {
  host: Host;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private userIdle: UserIdleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.host = data['host'][0];
    });
    this.tracking();
  }
  tracking(){
    this.userIdle.startWatching();
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe();
    this.userIdle.onTimeout().subscribe(() => {
      this.inactivity();
    });
  }

  inactivity() {
    this.alertify.confirm(
      'Do you wish to continue with this session ? ',
      () => {
        this.authService.refresh().subscribe(
          () => {
            this.alertify.success('token has been refreshed');
            this.userIdle.resetTimer();
          },
          (error) => {
            this.alertify.error(error);
          }
        );
      },
      () => {
        this.logout();
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('refresh');
    this.alertify.message('logged out');
    this.router.navigate(['/host']);
  }

}
