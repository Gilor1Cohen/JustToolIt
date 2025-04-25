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
        console.log('User data3:', data);

        if (!data.token) {
          console.log('No token found');

          this.auth.setData(null, false, null, null, null);
          return;
        }
        this.auth.getUserData(data.token).subscribe({
          next: (data: AuthData | null) => {
            console.log('User data2:', data);

            if (data) {
              console.log('User data:', data);

              this.auth.setData(
                data.userId?.toString() ?? null,
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
            console.log(err);

            this.auth.setData(null, false, null, null, null);
          },
        });
      },
      error: (err: any) => {
        console.log(err);

        this.auth.setData(null, false, null, null, null);
      },
    });
  }
}
