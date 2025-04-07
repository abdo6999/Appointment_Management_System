import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/auth/login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { WorkScheduleComponent } from './component/work-schedule/work-schedule.component';
import { ProfileComponent } from './component/profile/profile.component';
import { DoctorAppointmentsComponent } from './component/doctor-appointments/doctor-appointments.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HomeComponent } from './component/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WorkScheduleComponent,
    ProfileComponent,
    DoctorAppointmentsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [provideHttpClient(withInterceptorsFromDi())  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
