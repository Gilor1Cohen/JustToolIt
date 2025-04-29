import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/Auth/auth-service.service';
import { AuthData, AuthRes, PlanChangeResponse } from '../../Models/AuthModel';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../Services/Payment/payment.service';

@Component({
  selector: 'app-choose-plan',
  imports: [CommonModule],
  templateUrl: './choose-plan.component.html',
  styleUrl: './choose-plan.component.css',
})
export class ChoosePlanComponent implements OnInit {
  plan: number | null = null;
  planStatus: 'active' | 'cancelled' | 'expired' | null = null;
  Loading: boolean = false;
  userID: string | null = null;

  constructor(
    private auth: AuthServiceService,
    private payment: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.userData?.subscribe({
      next: (data: AuthData | null) => {
        if (!data) {
          this.router.navigate(['/']);
          return;
        }

        this.userID = data?.userId;

        this.plan = data?.planId;

        this.planStatus = data?.status;
      },

      error: (err: any) => {
        this.router.navigate(['/']);
      },
    });
  }

  choosePlan(plan: number) {
    if (plan === this.plan) return;
    this.Loading = true;

    this.payment.changePlan(plan, this.userID as string).subscribe({
      next: (value: PlanChangeResponse) => {
        this.Loading = false;

        this.auth.setData({
          userId: value.data.user_id,
          isAuthenticated: true,
          planId: value.data.plan_id,
          status: value.data.status,
          end_date: value.data.end_date ? new Date(value.data.end_date) : null,
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.Loading = false;
        console.log(err);

        this.router.navigate(['/']);
      },
    });
  }
}
