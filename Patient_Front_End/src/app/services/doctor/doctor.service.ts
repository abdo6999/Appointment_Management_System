import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }
  getAllDoctors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors`);
  }
}
