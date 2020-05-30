/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HostadminComponent } from './hostadmin.component';

describe('HostadminComponent', () => {
  let component: HostadminComponent;
  let fixture: ComponentFixture<HostadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
