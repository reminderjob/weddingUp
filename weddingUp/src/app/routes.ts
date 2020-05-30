import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContentResolver } from './_resolvers/content.resolver';
import { NothingComponent } from './nothing/nothing.component';
import { HostComponent } from './host/host.component';
import { HostadminComponent } from './hostadmin/hostadmin.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: 'id/:the_host',
    component: HomeComponent,
    resolve: { contents: ContentResolver },
  },
  { path: 'host', component: HostComponent },
  {
    path: 'hostadmin',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HostadminComponent,
      }
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
    component: NothingComponent,
  },

];
