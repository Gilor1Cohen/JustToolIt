import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { Router } from '@angular/router';
import { HttpErrorResponseDetails } from '../../../../../../Core/Models/ToolsModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily-water-intake-calculator',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './daily-water-intake-calculator.component.html',
  styleUrl: './daily-water-intake-calculator.component.css',
})
export class DailyWaterIntakeCalculatorComponent implements OnInit {
  Error: string | null = null;
  Loading: boolean = false;
  Data: number | null = null;

  Form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tools: ToolsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      Weight: ['', [Validators.required, Validators.min(0)]],
      activityLevel: ['', [Validators.required]],
      climate: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.Loading = true;
    this.Error = null;

    this.tools.DailyWaterIntakeCalculator(this.Form.value).subscribe({
      next: (value: number) => {
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
}
