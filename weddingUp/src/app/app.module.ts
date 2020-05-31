import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { ContentService } from './_services/content.service';
import { appRoutes } from './routes';
import { ContentResolver } from './_resolvers/content.resolver';
import { HostResolver } from './_resolvers/host.resolver';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { CountdownModule } from 'ng2-date-countdown';
import { UserIdleModule } from 'angular-user-idle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

import { NothingComponent } from './nothing/nothing.component';
import { RegisterComponent } from './hostpage/register/register.component';
import { HostComponent } from './hostpage/host/host.component';
import { LoginComponent } from './hostpage/login/login.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { HostadminComponent } from './hostadminpage/hostadmin/hostadmin.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HostnavComponent } from './hostadminpage/hostnav/hostnav.component';
import { ContentComponent } from './hostadminpage/content/content.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    NothingComponent,
    RegisterComponent,
    HostComponent,
    LoginComponent,
    HostadminComponent,
    HostnavComponent,
    ContentComponent,
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
    UserIdleModule.forRoot({ idle: 600, timeout: 60, ping: 120 }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:8000'],
        blacklistedRoutes: ['localhost:8000/api/auth'],
      },
    }),
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [
    AuthService,
    ContentService,
    ContentResolver,
    HostResolver,
    DatePipe,
    ErrorInterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
