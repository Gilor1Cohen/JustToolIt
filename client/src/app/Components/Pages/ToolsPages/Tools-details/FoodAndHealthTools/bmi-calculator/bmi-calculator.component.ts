import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BmiResult,
  HttpErrorResponseDetails,
} from '../../../../../../Core/Models/ToolsModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bmi-calculator',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './bmi-calculator.component.html',
  styleUrl: './bmi-calculator.component.css',
})
export class BmiCalculatorComponent implements OnInit {
  Error: string | null = null;
  Loading: boolean = false;
  Data: BmiResult | null = null;

  Form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tools: ToolsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      Weight: ['', [Validators.required, Validators.min(0)]],
      Height: ['', [Validators.required, Validators.min(0)]],
      Age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      Gender: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.Loading = true;
    this.Error = null;

    this.tools.BmiCalculator(this.Form.value).subscribe({
      next: (value: BmiResult) => {
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
