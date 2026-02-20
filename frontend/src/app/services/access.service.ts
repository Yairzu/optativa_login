import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting } from '../setting/appsetting';
import { register } from '../interface/register';
import { Observable } from 'rxjs';
import { accessResponse } from '../interface/accessResponse';
import { login } from '../interface/login';

@Injectable({
  providedIn: 'root',
})
export class AccessService {
  private htpp = inject(HttpClient);
  private baseUrl: string = appsetting.apiUrl;

  constructor() {}

  register(object: register): Observable<accessResponse> {
    return this.htpp.post<accessResponse>(`${this.baseUrl}register`, object);
  }

  login(object: login): Observable<accessResponse> {
    return this.htpp.post<accessResponse>(`${this.baseUrl}login`, object);
  }
}
