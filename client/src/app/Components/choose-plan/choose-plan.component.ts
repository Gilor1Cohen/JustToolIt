import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/Auth/auth-service.service';
import { AuthData } from '../../Models/AuthModel';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-plan',
  imports: [CommonModule],
  templateUrl: './choose-plan.component.html',
  styleUrl: './choose-plan.component.css',
})
export class ChoosePlanComponent implements OnInit {
  plan: number | null = null;
  planStatus: 'active' | 'cancelled' | 'expired' | null = null;

  constructor(private auth: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.auth.userData?.subscribe({
      next: (data: AuthData | null) => {
        if (!data) {
          this.router.navigate(['/']);
          return;
        }

        this.plan = data?.planId;

        this.planStatus = data?.status;
      },

      error: (err: any) => {
        this.router.navigate(['/']);
      },
    });
  }
}
