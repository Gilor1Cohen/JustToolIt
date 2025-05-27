import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { HttpErrorResponseDetails } from '../../../../../../Core/Models/ToolsModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base-converter',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './base-converter.component.html',
  styleUrl: './base-converter.component.css',
})
export class BaseConverterComponent implements OnInit {
  Form!: FormGroup;
  Data: any | null = null;
  Loading: boolean = false;
  Error: string | null = null;

  CommonBases: number[] = [2, 8, 10, 16, 32, 36];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tools: ToolsService
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      value: ['', Validators.required],
      fromBase: [
        '',
        [Validators.required, Validators.min(2), Validators.max(36)],
      ],
      toBase: [
        '',
        [Validators.required, Validators.min(2), Validators.max(36)],
      ],
    });
  }

  onSubmit(): void {
    this.Data = null;
    this.Error = null;
    this.Loading = true;

    this.tools.BaseConverter(this.Form.value).subscribe({
      next: (value: any) => {
        this.Data = value;
        this.Loading = false;
      },
      error: (err: HttpErrorResponseDetails) => {
        if (err.error.message === 'Missing token.') {
          const currentUrl = this.router.url;
          this.router.navigate(['/LogIn'], {
            queryParams: { returnUrl: currentUrl },
          });
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
