import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { HttpErrorResponseDetails } from '../../../../../../Core/Models/ToolsModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jwt-token-decoder',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './jwt-token-decoder.component.html',
  styleUrl: './jwt-token-decoder.component.css',
})
export class JwtTokenDecoderComponent implements OnInit {
  Form!: FormGroup;
  FormLoading: boolean = false;
  DecodedPayload: any = null;
  ErrorMessage: string | null = null;

  constructor(
    private tools: ToolsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      token: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.DecodedPayload = null;
    this.ErrorMessage = null;
    this.FormLoading = true;

    this.tools.decodeToken(this.Form.value).subscribe({
      next: (value: any) => {
        this.DecodedPayload = value;
        this.FormLoading = false;
      },
      error: (err: any) => {
        this.ErrorMessage = err.error.error;
        if (err.error.message === 'Missing token.') {
          const currentUrl = this.router.url;
          this.router.navigate(['/LogIn'], {
            queryParams: { returnUrl: currentUrl },
          });
        }

        this.FormLoading = false;
      },
    });
  }

  copyPayload(): void {
    const text = JSON.stringify(this.DecodedPayload, null, 2);
    if (!text) return;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy.');
      });
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
