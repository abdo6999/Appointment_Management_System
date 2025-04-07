import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { SignUpComponent } from './component/auth/sign-up/sign-up.component';
import { HomeComponent } from './component/home/home.component';
import { DoctorsComponent } from './component/doctors/doctors.component';
import { BookingsComponent } from './component/bookings/bookings.component';
import { ProfileComponent } from './component/profile/profile.component';
import { BookComponent } from './component/book/book.component';
import { AuthGuard } from './guard/auth.guard';
import { GuestComponent } from './component/auth/guest/guest.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent , canActivate: [AuthGuard]},
  { path: 'sign-up', component: SignUpComponent , canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'doctors', component: DoctorsComponent, canActivate: [AuthGuard] },
  { path: 'doctors/book/:id', component: BookComponent, canActivate: [AuthGuard] },
  { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'guest', component: GuestComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
