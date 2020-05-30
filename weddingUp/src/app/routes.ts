import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContentResolver } from './_resolvers/content.resolver';
import { NothingComponent } from './nothing/nothing.component';
import { HostComponent } from './host/host.component';

export const appRoutes: Routes = [
  {
    path: 'id/:the_host',
    component: HomeComponent,
    resolve: { contents: ContentResolver },
  },
  { path: 'register', component: HostComponent },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
    component: NothingComponent,
  },
];
