import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createPatient(payload: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/patient`, payload).pipe(
      map(response => {
        const { uuid, accessToken, refreshToken, role } = response;

        if (role === 'patient') {
          localStorage.setItem('uuid', uuid);
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('role', role);
          return response;
        } else {
          throw new Error('Access denied: not a patient');
        }
      }),
      catchError(error => {
        return throwError(() =>
          new Error(error?.error?.message || 'Registration failed')
        );
      })
    );
  }

  signIn(payload: {
    username: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/signin`, payload).pipe(
      map(response => {
        const { uuid, accessToken, refreshToken, role } = response;

        if (role === 'patient') {
          // Store tokens and role
          localStorage.setItem('uuid', uuid);
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('role', role);
          return response; // allow login
        } else {
          throw new Error('Access denied: not a patient');
        }
      }),
      catchError(error => {
        return throwError(() =>
          new Error(error?.error?.message || 'Login failed')
        );
      })
    );
  }

  private tryRefreshToken(): Observable<{ authenticated: boolean }> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return of({ authenticated: false });

    return this.http.post(`${this.apiUrl}/users/refresh`, { refreshToken }).pipe(
      map((res: any) => {
        if (res?.accessToken && res?.role === 'patient') {
          localStorage.setItem('accessToken', res.accessToken);
          return { authenticated: true };
        }
        return { authenticated: false };
      }),
      catchError(() => of({ authenticated: false }))
    );
  }


  checkAuth(): Observable<{ authenticated: boolean }> {
    const guestData = JSON.parse(localStorage.getItem('guestData') || '{}');
    if (guestData.guest) {
      return of({ authenticated: true });
    }
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return this.tryRefreshToken();
    }

    return this.http.get(`${this.apiUrl}/users/status`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).pipe(
      map((res: any) => {
        return res?.role === 'patient'
          ? { authenticated: true }
          : { authenticated: false };
      }),
      catchError(() => this.tryRefreshToken())
    );
  }



  getStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/status`);
  }

  logout(): void {
    localStorage.removeItem('uuid');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
  }
}
