import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DailyPrayerTimesRes } from '../../../../../../Core/Models/ToolsModel';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../../../../Core/Services/Auth/auth-service.service';

@Component({
  selector: 'app-daily-prayer-times',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './daily-prayer-times.component.html',
  styleUrl: './daily-prayer-times.component.css',
})
export class DailyPrayerTimesComponent implements OnInit {
  Error: string | null = null;
  Loading: boolean = false;
  Data: DailyPrayerTimesRes | null = null;

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
        this.tools.DailyPrayerTimes(this.Form.value).subscribe({
          next: (value: DailyPrayerTimesRes) => {
            this.Data = value;
            this.auth.addFreeUserAction().subscribe({
              next: (value: any) => {},
              error: (err: any) => {},
            });
            this.Loading = false;
          },
          error: (err: any) => {
            this.Error = err.error.data;
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
}
