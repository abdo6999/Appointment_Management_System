import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { WorkScheduleComponent } from './component/work-schedule/work-schedule.component';
import { ProfileComponent } from './component/profile/profile.component';
import { DoctorAppointmentsComponent } from './component/doctor-appointments/doctor-appointments.component';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,canActivate:[authGuard] },
  {
    path: 'work-schedule',
    component: WorkScheduleComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'appointments',
    component: DoctorAppointmentsComponent,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'home',component:HomeComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
