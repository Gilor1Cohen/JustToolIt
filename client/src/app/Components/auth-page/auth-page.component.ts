import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../Services/Auth/auth-service.service';
import { AuthError, LogInRes, SignUpRes } from '../../Models/AuthModel';

@Component({
  selector: 'app-auth-page',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent implements OnInit {
  isSignUp: boolean = true;
  Form!: FormGroup;
  Loading: boolean = false;
  Error: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.isSignUp = url[0].path === 'SignUp';
    });

    this.FormInitialization();
  }

  FormInitialization(): void {
    const baseControls = {
      Email: ['', [Validators.required, Validators.email]],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
        ],
      ],
    };

    if (this.isSignUp) {
      this.Form = this.fb.group({
        FirstName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ],
        ],
        ...baseControls,
      });
    } else {
      this.Form = this.fb.group(baseControls);
    }
  }

  onSubmit(): void {
    this.Loading = true;
    this.Error = '';

    this.isSignUp
      ? this.auth.SignUp(this.Form.value).subscribe({
          next: (value: SignUpRes) => {
            this.Loading = false;
            this.auth.setData(value.userId, true, null, null, null);
            this.Error = '';
            this.Form.reset();
            this.router.navigate(['/ChoosePlan']);
          },
          error: (err: AuthError) => {
            this.Loading = false;
            this.Error = err.error.message;
          },
        })
      : this.auth.LogIn(this.Form.value).subscribe({
          next: (value: LogInRes) => {
            this.Loading = false;

            this.Loading ? console.log('Loading...') : console.log('Loaded!');

            this.auth.setData(
              value.userId,
              true,
              value.planId,
              value.status,
              value.end_date
            );
            this.Form.reset();
            this.router.navigate(['/Tools']);
          },
          error: (err: AuthError) => {
            this.Loading = false;
            this.Error = err.error.message;
          },
        });
  }
}
