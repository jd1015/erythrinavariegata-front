import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeComponent }      from './theme/theme.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MaterialComponent }  from './material/material.component';

const routes: Routes = [
  { path: 'detail/:themeId', component: MaterialComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'theme', component: ThemeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
