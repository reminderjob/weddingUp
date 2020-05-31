/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HostnavComponent } from './hostnav.component';

describe('HostnavComponent', () => {
  let component: HostnavComponent;
  let fixture: ComponentFixture<HostnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
