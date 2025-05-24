import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../../../../../Core/Services/Auth/auth-service.service';
import { CommonModule } from '@angular/common';
import {
  LocationRes,
  SunriseSunsetRes,
} from '../../../../../../Core/Models/ToolsModel';

@Component({
  selector: 'app-sabbath-candle-lighting-time',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sabbath-candle-lighting-time.component.html',
  styleUrl: './sabbath-candle-lighting-time.component.css',
})
export class SabbathCandleLightingTimeComponent implements OnInit {
  Error: string | null = null;
  Loading: boolean = false;
  Data: any | null = null;

  Form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tools: ToolsService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      City: ['', [Validators.required]],
      Country: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.Loading = true;
    this.Error = null;
    this.Data = null;

    this.auth.checkUser().subscribe({
      next: (value: any) => {
        this.tools.GetLoc(this.Form.value).subscribe({
          next: (value: LocationRes[]) => {
            const lat = value[0].lat;
            const lon = value[0].lon;

            if (!lat || !lon) {
              this.Error = 'Invalid location data. Please check your inputs.';
              this.Loading = false;
              return;
            }

            this.tools.GetSunset(lat, lon, this.getNextFridayDate()).subscribe({
              next: (value: SunriseSunsetRes) => {
                const sunsetUTC = new Date(value.results.sunset);
                const lightingTimeUTC = new Date(
                  sunsetUTC.getTime() - 18 * 60 * 1000
                );

                this.Data = lightingTimeUTC.toLocaleTimeString('he-IL', {
                  timeZone: 'Asia/Jerusalem',
                  hour: '2-digit',
                  minute: '2-digit',
                });
                this.Loading = false;
              },
              error: (err: any) => {
                this.Error =
                  'Error fetching candle lighting time. Please check your inputs.';
                this.Loading = false;
              },
            });

            this.auth.addFreeUserAction().subscribe({
              next: (value: any) => {},
              error: (err: any) => {},
            });
          },
          error: (err: any) => {
            this.Error =
              'Error fetching location data. Please check your inputs.';
            this.Loading = false;
          },
        });
      },
      error: (err: any) => {
        if (err.error.message === 'Missing token.') {
          const currentUrl = this.router.url;
          this.router.navigate(['/LogIn'], {
            queryParams: { returnUrl: currentUrl },
          });
          return;
        }
        this.Error = err.error.message;
        this.Loading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  getNextFridayDate(): string {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;

    const friday = new Date(today);
    friday.setDate(today.getDate() + daysUntilFriday);

    const year = friday.getFullYear();
    const month = (friday.getMonth() + 1).toString().padStart(2, '0');
    const day = friday.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
