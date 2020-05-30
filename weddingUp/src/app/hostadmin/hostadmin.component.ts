import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-hostadmin',
  templateUrl: './hostadmin.component.html',
  styleUrls: ['./hostadmin.component.css'],
})
export class HostadminComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private userIdle: UserIdleService
  ) {}

  ngOnInit() {
    this.refreshTokenTime();

  }

  refreshTokenTime(){
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
    localStorage.removeItem('refresh');
    this.alertify.message('logged out');
    this.router.navigate(['/host']);
  }
}
