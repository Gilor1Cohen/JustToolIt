import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/Auth/auth-service.service';
import { AuthData } from '../../Models/AuthModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  UserData: AuthData | null = null;

  Date: Date | null = null;

  ngOnInit(): void {
    this.UserData = this.auth.sendData();

    if (this.UserData.end_date) {
      this.Date = new Date(this.UserData.end_date);
    }
  }

  constructor(private auth: AuthServiceService) {}
}
