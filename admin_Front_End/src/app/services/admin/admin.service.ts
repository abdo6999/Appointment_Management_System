import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private base_url = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  createDoctorAccount(doctorData: any): Observable<any> {
    return this.http.post(`${this.base_url}/users/doctor`, doctorData);
  }

  createDoctorProfile(doctorProfileData: any): Observable<any> {
    return this.http.post(`${this.base_url}/doctors`, doctorProfileData);
  }

  createDoctor(doctorAccountData: any, doctorProfileData: any): Observable<any> {
    return new Observable<any>((observer) => {
      this.createDoctorAccount(doctorAccountData).subscribe({
        next: (accountResponse) => {
          if (accountResponse?.uuid) {
            doctorProfileData.id = accountResponse.uuid;
            this.createDoctorProfile(doctorProfileData).subscribe({
              next: (profileResponse) => {
                observer.next(profileResponse);
                observer.complete();
              },
              error: (profileError) => {
                observer.error(profileError);
              }
            });
          } else {
            observer.error("Failed to create doctor account");
          }
        },
        error: (accountError) => {
          observer.error(accountError);
        }
      });
    });
  }
}
