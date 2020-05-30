import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { ContentService } from './_services/content.service';
import { appRoutes } from './routes';
import { ContentResolver } from './_resolvers/content.resolver';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { CountdownModule } from 'ng2-date-countdown';
import { UserIdleModule } from 'angular-user-idle';

import { NothingComponent } from './nothing/nothing.component';
import { RegisterComponent } from './hostpage/register/register.component';
import { HostComponent } from './hostpage/host/host.component';
import { LoginComponent } from './hostpage/login/login.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { HostadminComponent } from './hostadminpage/hostadmin/hostadmin.component';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      NavComponent,
      NothingComponent,
      RegisterComponent,
      HostComponent,
      LoginComponent,
      HostadminComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      BrowserAnimationsModule,
      NgxNavbarModule,
      CountdownModule,
      UserIdleModule.forRoot({idle: 600, timeout: 60, ping: 120})
   ],
   providers: [
      AuthService,
      ContentService,
      ContentResolver,
      DatePipe,
      ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
