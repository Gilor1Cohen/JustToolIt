import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../Services/Auth/auth-service.service';

@Component({
  selector: 'app-auth-page',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent implements OnInit {
  isSignUp: boolean = true;
  Form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthServiceService
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
    this.isSignUp
      ? this.auth.SignUp(this.Form.value).subscribe({
          next(value) {
            console.log(value);
          },
          error(err) {
            console.log(err);
          },
        })
      : this.auth.LogIn(this.Form.value).subscribe({
          next(value) {
            console.log(value);
          },
          error(err) {
            console.log(err);
          },
        });
  }
}
