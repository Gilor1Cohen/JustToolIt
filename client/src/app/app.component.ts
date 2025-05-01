import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './Components/Layout/footer/footer.component';
import { NavBarComponent } from './Components/Layout/nav-bar/nav-bar.component';
import { AuthServiceService } from './Core/Services/Auth/auth-service.service';
import { AuthData } from './Core/Models/AuthModel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthServiceService) {}

  ngOnInit(): void {
    this.auth.getToken().subscribe({
      next: (data: { token: string }) => {
        if (!data.token) {
          this.auth.setData({
            userId: null,
            isAuthenticated: false,
            planId: null,
            status: null,
            end_date: null,
          });
          return;
        }

        this.auth.getUserData(data.token).subscribe({
          next: (data: AuthData | null) => {
            if (data) {
              this.auth.setData({
                userId: data.userId?.toString() ?? null,
                isAuthenticated: data.isAuthenticated,
                planId: data.planId,
                status: data.status,
                end_date: data.end_date,
              });
            } else {
              this.auth.setData({
                userId: null,
                isAuthenticated: false,
                planId: null,
                status: null,
                end_date: null,
              });
            }
          },
          error: () => {
            this.auth.setData({
              userId: null,
              isAuthenticated: false,
              planId: null,
              status: null,
              end_date: null,
            });
          },
        });
      },
      error: () => {
        this.auth.setData({
          userId: null,
          isAuthenticated: false,
          planId: null,
          status: null,
          end_date: null,
        });
      },
    });
  }
}
