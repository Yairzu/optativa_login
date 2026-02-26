import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface User {
  id?: string;
  email?: string;
  name?: string;
  id_rol?: number;
  nick_user?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authSubject = new BehaviorSubject<AuthState>(this.getInitialState());
  public readonly auth$ = this.authSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeAuthState();
  }

  private getInitialState(): AuthState {
    return {
      isAuthenticated: false,
      user: null,
      token: null
    };
  }

  private initializeAuthState(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      this.clearAuth();
      return;
    }

    try {
      const parsedUser: User = JSON.parse(user);

      this.authSubject.next({
        isAuthenticated: true,
        user: parsedUser,
        token
      });

    } catch {
      this.clearAuth();
    }
  }

  setAuthState(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authSubject.next({
      isAuthenticated: true,
      user,
      token
    });
  }

  logout(): void {
    this.clearAuth();
  }

  private clearAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authSubject.next(this.getInitialState());
  }

  getToken(): string | null {
    return this.authSubject.value.token;
  }

  isAuthenticated(): boolean {
    return this.authSubject.value.isAuthenticated;
  }

  isAuthenticated$(): Observable<boolean> {
    return this.auth$.pipe(map(state => state.isAuthenticated));
  }

  getUser$(): Observable<User | null> {
    return this.auth$.pipe(map(state => state.user));
  }

  getToken$(): Observable<string | null> {
    return this.auth$.pipe(map(state => state.token));
  }
}