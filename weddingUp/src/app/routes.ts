import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContentResolver } from './_resolvers/content.resolver';
import { NothingComponent } from './nothing/nothing.component';

export const appRoutes: Routes = [
  {
    path: ':the_host',
    component: HomeComponent,
    resolve: { contents: ContentResolver },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' ,component: NothingComponent},
];
