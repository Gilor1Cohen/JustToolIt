import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private Url = 'http://localhost:4201/Payment/Change-Plan';

  constructor(private http: HttpClient) {}

  changePlan(plan: number, userID: string): Observable<any> {
    return this.http.post(
      `${this.Url}`,
      { plan, userID },
      {
        withCredentials: true,
      }
    );
  }
}
