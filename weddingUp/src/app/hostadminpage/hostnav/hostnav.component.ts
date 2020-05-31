import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { Host } from '../../_models/host';
import { HostService } from 'src/app/_services/host.service';

@Component({
  selector: 'app-hostnav',
  templateUrl: './hostnav.component.html',
  styleUrls: ['./hostnav.component.css']
})
export class HostnavComponent implements OnInit {
  @Output() tabMode = new EventEmitter();
  activeTab = 'DashBoard';
  host: Host = JSON.parse(localStorage.getItem('host'));

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private hostService: HostService
  ) {}

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('host');
    localStorage.removeItem('refresh');
    this.authService.decodedToken = null;
    this.hostService.currentHost = null;
    this.alertify.message('logged out');
    this.router.navigate(['/host']);
  }

  select(activeTab){
    this.activeTab = activeTab;
    this.tabMode.emit(activeTab);
  }

}
