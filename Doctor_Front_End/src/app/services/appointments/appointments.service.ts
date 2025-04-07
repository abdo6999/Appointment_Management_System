import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private apiUrl = environment.apiUrl;
  id = localStorage.getItem('uuid');

  constructor(private http: HttpClient) { }
  getAppointmentsForDoctor(): Observable<any> {
    if (!this.id) {
      throw new Error('Doctor UUID not found in localStorage');
    }
    return this.http.get(`${this.apiUrl}/appointments/doctor/${this.id}`);
  }
  updateAppointment(appointmentId:string,updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/appointments/${appointmentId}`, {status:updateData});
  }
}
