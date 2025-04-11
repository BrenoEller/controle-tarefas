import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';

  public isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());
  private usuario: any = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string; user: any }>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        this.storeToken(response.token);
        this.storeUser(response.user);
        this.isAuthenticated$.next(true);
      })
    );
  }

  register(username: string, email: string, password: string) {
    return this.http.post<{ token: string; user: any }>(`${this.apiUrl}/register`, {
      username,
      email,
      password,
    }).pipe(
      tap(response => {
        this.storeToken(response.token);
        this.storeUser(response.user);
        this.isAuthenticated$.next(true);
      }),
    );
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.clearStorage();
        this.isAuthenticated$.next(false);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUsuarioLocal() {
    if (!this.usuario) {
      const userJson = localStorage.getItem(this.userKey);
      this.usuario = userJson ? JSON.parse(userJson) : null;
    }
    return this.usuario;
  }

  getUsuarioLogado() {
    return this.http.get<any>(`${this.apiUrl}/user`);
  }

  private storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  private storeUser(user: any) {
    this.usuario = user;
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private clearStorage() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.usuario = null;
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }
}