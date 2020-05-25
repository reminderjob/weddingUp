import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContentResolver } from './_resolvers/content.resolver';

export const appRoutes: Routes = [
  {
    path: ':the_host',
    component: HomeComponent,
    resolve: { contents: ContentResolver },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
