import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css'],
})
export class HostComponent implements OnInit {
  registerMode = false;

  constructor() {}

  ngOnInit() {}

  select(registerMode) {
    this.registerMode = registerMode;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
