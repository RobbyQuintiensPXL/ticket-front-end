import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {EventDetailComponent} from './components/event-detail/event-detail.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AddEventComponent} from './components/add-event/add-event.component';
import {AuthGuard} from './auth/auth.guard';
import {OfficeHomeComponent} from './components/office-home/office-home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'events/:id',
    component: EventDetailComponent,
  },
  {
    path: 'search',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'add-event',
    component: AddEventComponent,
    data: {
      roles: ['jevents-office']
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'office-home',
    data: {
      roles: ['jevents-office']
    },
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'search', pathMatch: 'full'},
      {path: 'search', component: OfficeHomeComponent},
    ]
  },
];

export const AppRoutes = RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'});
