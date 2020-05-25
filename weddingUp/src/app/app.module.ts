import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common'

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

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      NavComponent,
      NothingComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      BrowserAnimationsModule,
      NgxNavbarModule,
      CountdownModule
   ],
   providers: [
      AuthService,
      ContentService,
      ContentResolver,
      DatePipe
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
