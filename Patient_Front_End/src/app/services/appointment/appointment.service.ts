import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }
  createAppointment(appointment:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/appointments`, appointment)
  }
  getBookedSlotIds(date: string, doctorId: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.apiUrl}/appointments/booked-slots?doctor_id=${doctorId}&date=${date}`
    );
  }

  getAllAppointmentByPatientId(id:string){
    return this.http.get<string[]>(`${this.apiUrl}/appointments/patient/${id}`)
  }
  getAllAppointmentByGuest_idId(id:string){
    return this.http.get<string[]>(`${this.apiUrl}/appointments/guest/${id}`)
  }
}
