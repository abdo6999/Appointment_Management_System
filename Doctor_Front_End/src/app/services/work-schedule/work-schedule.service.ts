import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkScheduleService {
  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) {}

  create(workSchedule: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/work-schedules`, workSchedule);
  }

  getByDoctorId(doctorId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/work-schedules/doctor/${doctorId}`);
  }

  update(id: string, updatedSchedule: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/work-schedules/${id}`, updatedSchedule);
  }
}
