import { Injectable } from '@angular/core';
import { LogInReq, SignUpReq } from '../../Models/AuthModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  LogIn(data: LogInReq): Observable<any> {
    return this.http.post('http://localhost:4201/Auth/LogIn', data);
  }

  SignUp(data: SignUpReq): Observable<any> {
    return this.http.post('http://localhost:4201/Auth/SignUp', data);
  }
}
