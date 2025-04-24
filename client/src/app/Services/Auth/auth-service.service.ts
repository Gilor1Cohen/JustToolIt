import { Injectable } from '@angular/core';
import {
  AuthData,
  LogInReq,
  LogInRes,
  SignUpReq,
  SignUpRes,
  JwtPayload,
} from '../../Models/AuthModel';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private baseUrl: string = 'http://localhost:4201/Auth';
  private authStatusSubject = new BehaviorSubject<boolean>(false);
  public authStatus = this.authStatusSubject.asObservable();
  private userId: string | null = null;
  private planId: number | null = null;
  private status: 'active' | 'cancelled' | 'expired' | null = null;
  private end_date: Date | null = null;

  constructor(private http: HttpClient) {}

  LogIn(data: LogInReq): Observable<LogInRes> {
    return this.http.post<LogInRes>(this.baseUrl + '/LogIn', data, {
      withCredentials: true,
    });
  }

  SignUp(data: SignUpReq): Observable<SignUpRes> {
    return this.http.post<SignUpRes>(this.baseUrl + '/SignUp', data, {
      withCredentials: true,
    });
  }

  getToken(): Observable<{ token: string }> {
    return this.http.get<{ token: string }>(this.baseUrl + '/GetToken', {
      withCredentials: true,
    });
  }

  getUserData(token: string): Observable<AuthData | null> {
    return new Observable((observer) => {
      try {
        if (token) {
          const decoded = jwtDecode<JwtPayload>(token);

          observer.next({
            userId: decoded.id,
            isAuthenticated: true,
            planId: decoded.plan_id,
            status: decoded.plan_status,
            end_date: decoded.end_date,
          });
        } else {
          observer.next(null);
        }
      } catch (error) {
        observer.next(null);
      } finally {
        observer.complete();
      }
    });
  }

  setData(
    userId: string | null,
    authStatus: boolean,
    planId: number | null,
    status: 'active' | 'cancelled' | 'expired' | null,
    end_date: Date | null
  ): void {
    this.userId = userId;
    this.authStatusSubject.next(authStatus);
    this.planId = planId;
    this.status = status;
    this.end_date = end_date;
  }

  sendData(): AuthData {
    return {
      userId: this.userId,
      isAuthenticated: this.authStatusSubject.getValue(),
      planId: this.planId,
      status: this.status,
      end_date: this.end_date! ? this.end_date : new Date(),
    };
  }
}
