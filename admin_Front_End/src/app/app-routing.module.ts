import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/auth/login/login.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'',pathMatch:"full",redirectTo:'login'},
  {path:'home',component:HomeComponent ,canActivate:[authGuard]},
  {path:'login',component:LoginComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
