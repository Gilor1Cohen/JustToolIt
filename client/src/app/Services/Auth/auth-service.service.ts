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

  private userDataSubject = new BehaviorSubject<AuthData | null>(null);
  public userData = this.userDataSubject.asObservable();

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

  LogOut(): Observable<any> {
    return this.http.get(this.baseUrl + '/LogOut', {
      withCredentials: true,
    });
  }

  getUserData(token: string): Observable<AuthData | null> {
    return new Observable((observer) => {
      try {
        if (token) {
          const decoded = jwtDecode<JwtPayload>(token);

          console.log('Decoded token:', decoded);

          const data: AuthData = {
            userId: decoded.id,
            isAuthenticated: true,
            planId: decoded.plan_id,
            status: decoded.plan_status,
            end_date: decoded.end_date
              ? new Date(
                  Number(decoded.end_date.split('.')[2]),
                  Number(decoded.end_date.split('.')[1]) - 1,
                  Number(decoded.end_date.split('.')[0])
                )
              : null,
          };

          this.userDataSubject.next(data);
          observer.next(data);
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
    const data: AuthData = {
      userId,
      isAuthenticated: authStatus,
      planId,
      status,
      end_date,
    };

    this.userDataSubject.next(data);
  }

  sendData(): AuthData | null {
    return this.userDataSubject.getValue();
  }

  clearUserData(): void {
    this.userDataSubject.next(null);
  }
}
