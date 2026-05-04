import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { DashboardPageComponent } from './features/dashboard/dashboard.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardPageComponent, title: 'Dashboard' },
  {
    path: '',
    loadChildren: () =>
      loadRemoteModule('erpRemote', './Routes').then((module) => module.routes)
  },
  { path: '**', redirectTo: 'dashboard' }
];
