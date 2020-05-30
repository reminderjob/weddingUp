import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContentResolver } from './_resolvers/content.resolver';
import { NothingComponent } from './nothing/nothing.component';
import { HostComponent } from './hostpage/host/host.component';
import { HostadminComponent } from './hostadminpage/hostadmin/hostadmin.component';
import { AuthGuard } from './_guards/auth.guard';
import { HostResolver } from './_resolvers/host.resolver';

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
        resolve: {host: HostResolver}
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
