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
    console.log('AppComponent initialized');

    this.auth.getToken().subscribe({
      next: (data: { token: string }) => {
        if (!data.token) {
          this.auth.setData(null, false, null, null, null);
          return;
        }
        this.auth.getUserData(data.token).subscribe({
          next: (data: AuthData | null) => {
            if (data) {
              this.auth.setData(
                data.userId,
                data.isAuthenticated,
                data.planId,
                data.status,
                data.end_date
              );
            } else {
              this.auth.setData(null, false, null, null, null);
            }
          },
          error: (err: any) => {
            this.auth.setData(null, false, null, null, null);
          },
        });
      },
      error: (err: any) => {
        this.auth.setData(null, false, null, null, null);
      },
    });
  }
}
