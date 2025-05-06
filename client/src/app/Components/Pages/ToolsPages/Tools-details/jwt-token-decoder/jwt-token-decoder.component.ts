import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      token: ['', Validators.required],
    });

    this.Form.get('token')!.valueChanges.subscribe((token) => {
      if (!token) {
        this.DecodedPayload = null;
        this.ErrorMessage = null;
        this.FormLoading = false;
        return;
      }

      this.FormLoading = true;
      this.decodeToken(token);
    });
  }

  decodeToken(token: string): void {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error();

      const payloadBase64 =
        parts[1].replace(/-/g, '+').replace(/_/g, '/') +
        '='.repeat((4 - (parts[1].length % 4)) % 4);

      const json = decodeURIComponent(
        atob(payloadBase64)
          .split('')
          .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
          .join('')
      );

      this.DecodedPayload = JSON.parse(json);
      this.ErrorMessage = null;
    } catch {
      this.DecodedPayload = null;
      this.ErrorMessage = 'JWT is invalid';
    } finally {
      this.FormLoading = false;
    }
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
}
