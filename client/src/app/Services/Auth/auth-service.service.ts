import { Injectable } from '@angular/core';
import {
  AuthData,
  LogInReq,
  LogInRes,
  SignUpReq,
  SignUpRes,
} from '../../Models/AuthModel';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private baseUrl: string = 'http://localhost:4201/Auth';
  private authStatusSubject = new BehaviorSubject<boolean>(false);
  public authStatus = this.authStatusSubject.asObservable();
  private token: string | null = null;
  private userId: string | null = null;
  private planId: number | null = null;
  private status: 'active' | 'cancelled' | 'expired' | null = null;

  constructor(private http: HttpClient) {}

  LogIn(data: LogInReq): Observable<LogInRes> {
    return this.http.post<LogInRes>(this.baseUrl + '/LogIn', data);
  }

  SignUp(data: SignUpReq): Observable<SignUpRes> {
    return this.http.post<SignUpRes>(this.baseUrl + '/SignUp', data);
  }

  getUserData(): Observable<AuthData> {
    return this.http.get<AuthData>(this.baseUrl + '/GetUserData', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  setData(
    token: string,
    userId: string,
    AuthStatus: boolean,
    planId: number | null,
    status: 'active' | 'cancelled' | 'expired' | null
  ): void {
    this.token = token;
    this.userId = userId;
    this.authStatusSubject.next(AuthStatus);
    this.planId = planId;
    this.status = status;
  }

  sendData(): AuthData {
    return {
      token: this.token,
      userId: this.userId,
      isAuthenticated: this.authStatusSubject.getValue(),
      planId: this.planId,
      status: this.status,
    };
  }
}
