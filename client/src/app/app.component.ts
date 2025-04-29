import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AuthServiceService } from './Services/Auth/auth-service.service';
import { AuthData } from './Models/AuthModel';

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
