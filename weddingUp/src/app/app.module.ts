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
import { NothingComponent } from './nothing/nothing.component';
import { RegisterComponent } from './register/register.component';
import { HostComponent } from './host/host.component';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      NavComponent,
      NothingComponent,
      RegisterComponent,
      HostComponent,
      LoginComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule ,
      RouterModule.forRoot(appRoutes),
      BrowserAnimationsModule,
      NgxNavbarModule,
      CountdownModule
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
