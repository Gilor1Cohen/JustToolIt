import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/Auth/auth-service.service';
import { AuthData } from '../../Models/AuthModel';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  UserData: AuthData | null = null;

  endDate: Date | null = null;

  ngOnInit(): void {
    this.auth.userData.subscribe((data) => {
      this.UserData = data;

      if (this.UserData?.end_date) {
        this.endDate = new Date(this.UserData.end_date);
      } else {
        this.endDate = null;
      }
    });
  }

  constructor(private auth: AuthServiceService, private router: Router) {}

  LogOut(): void {
    this.auth.LogOut().subscribe({
      next: (res: any) => {
        this.auth.clearUserData();
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.error('Logout failed:', err);
      },
    });
  }
}
