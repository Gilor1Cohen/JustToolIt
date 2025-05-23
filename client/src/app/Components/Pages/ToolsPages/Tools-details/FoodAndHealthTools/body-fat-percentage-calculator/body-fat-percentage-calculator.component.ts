import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponseDetails } from '../../../../../../Core/Models/ToolsModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body-fat-percentage-calculator',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './body-fat-percentage-calculator.component.html',
  styleUrl: './body-fat-percentage-calculator.component.css',
})
export class BodyFatPercentageCalculatorComponent implements OnInit {
  Error: string | null = null;
  Loading: boolean = false;
  Data: any | null = null;

  Form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tools: ToolsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      Gender: ['', [Validators.required]],
      Waist: ['', [Validators.required, Validators.min(0)]],
      Neck: ['', [Validators.required, Validators.min(0)]],
      Height: ['', [Validators.required, Validators.min(0)]],
      Hip: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    this.Loading = true;
    this.Error = null;

    this.tools.BodyFatPercentageCalculator(this.Form.value).subscribe({
      next: (value: any) => {
        console.log(value);

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

        console.log(err);

        this.Error = err.error.message;
        this.Loading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
