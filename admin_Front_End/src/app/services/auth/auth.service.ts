// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  signIn(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post(`${this.apiUrl}/users/signin`, credentials).pipe(
      tap((response: any) => {
        if (response && response.role === 'admin') {
          this.storeTokens(response); 
        } else {
          throwError(() => new Error('Access restricted to admins only.'));
        }
      })
    );
  }

  private storeTokens(response: any): void {
    localStorage.setItem('uuid', response.uuid);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  private tryRefreshToken(): Observable<{ authenticated: boolean }> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return of({ authenticated: false });

    return this.http.post(`${this.apiUrl}/users/refresh`, { refreshToken }).pipe(
      map((res: any) => {
        if (res?.accessToken && res?.role === 'admin') {
          localStorage.setItem('accessToken', res.accessToken);
          return { authenticated: true };
        }
        return { authenticated: false };
      }),
      catchError(() => of({ authenticated: false }))
    );
  }


  checkAuth(): Observable<{ authenticated: boolean }> {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return this.tryRefreshToken();
    }

    return this.http.get(`${this.apiUrl}/users/status`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).pipe(
      map((res: any) => {
        return res?.role === 'admin'
          ? { authenticated: true }
          : { authenticated: false };
      }),
      catchError(() => this.tryRefreshToken())
    );
  }



  logOut(): void {
    localStorage.removeItem('uuid');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
