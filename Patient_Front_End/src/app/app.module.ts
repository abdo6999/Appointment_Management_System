import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/auth/login/login.component';
import { SignUpComponent } from './component/auth/sign-up/sign-up.component';
import { LodingComponent } from './component/loding/loding.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './component/home/home.component';
import { DoctorsComponent } from './component/doctors/doctors.component';
import { BookingsComponent } from './component/bookings/bookings.component';
import { ProfileComponent } from './component/profile/profile.component';
import { NavComponent } from './component/nav/nav.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import { BookComponent } from './component/book/book.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { GuestComponent } from './component/auth/guest/guest.component';
import {RecaptchaModule} from 'ng-recaptcha'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    LodingComponent,
    HomeComponent,
    DoctorsComponent,
    BookingsComponent,
    ProfileComponent,
    NavComponent,
    BookComponent,
    GuestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCardModule,
    RecaptchaModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }
