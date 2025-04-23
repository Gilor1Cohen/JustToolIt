import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../../Services/Auth/auth-service.service';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  ngOnInit(): void {
    this.auth.authStatus.subscribe((status: boolean) => {
      this.Auth = status;
    });
  }

  constructor(private auth: AuthServiceService) {}

  Auth: boolean | null = null;
}
