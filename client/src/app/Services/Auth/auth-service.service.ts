import { Injectable } from '@angular/core';
import {
  AuthData,
  LogInReq,
  AuthRes,
  SignUpReq,
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

  LogIn(data: LogInReq): Observable<AuthRes> {
    return this.http.post<AuthRes>(this.baseUrl + '/LogIn', data, {
      withCredentials: true,
    });
  }

  SignUp(data: SignUpReq): Observable<AuthRes> {
    return this.http.post<AuthRes>(this.baseUrl + '/SignUp', data, {
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

          const data: AuthData = {
            userId: decoded.id,
            isAuthenticated: true,
            planId: decoded.plan_id,
            status: decoded.plan_status,
            end_date:
              typeof decoded.end_date === 'string' &&
              /^\d{1,2}\.\d{1,2}\.\d{4}$/.test(decoded.end_date)
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

  setData(update: Partial<AuthData>): void {
    const current = this.userDataSubject.value ?? {
      userId: null,
      isAuthenticated: false,
      planId: null,
      status: null,
      end_date: null,
    };
    this.userDataSubject.next({ ...current, ...update });
  }

  sendData(): AuthData | null {
    return this.userDataSubject.getValue();
  }

  clearUserData(): void {
    this.userDataSubject.next(null);
  }
}
