import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthServiceService } from '../../../Core/Services/Auth/auth-service.service';
import { AuthData } from '../../../Core/Models/AuthModel';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  ngOnInit(): void {
    this.auth.userData.subscribe((data: AuthData | null) => {
      this.Auth = data?.isAuthenticated;
    });
  }

  constructor(private auth: AuthServiceService) {}

  Auth: boolean | undefined = false;
}
