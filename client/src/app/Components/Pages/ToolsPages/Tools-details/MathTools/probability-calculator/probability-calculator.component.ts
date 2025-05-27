import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpErrorResponseDetails,
  ProbabilityCalculatorRes,
} from '../../../../../../Core/Models/ToolsModel';

@Component({
  selector: 'app-probability-calculator',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './probability-calculator.component.html',
  styleUrl: './probability-calculator.component.css',
})
export class ProbabilityCalculatorComponent implements OnInit {
  Form!: FormGroup;
  Data: ProbabilityCalculatorRes | null = null;
  Loading: boolean = false;
  Error: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tools: ToolsService
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      mode: ['', Validators.required],
      n: ['', [Validators.required, Validators.min(0)]],
      r: ['', [Validators.required, Validators.min(0)]],
      successfulEvents: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    this.Data = null;
    this.Error = null;
    this.Loading = true;

    console.log(this.Form.value);

    this.tools.calculateProbability(this.Form.value).subscribe({
      next: (value: ProbabilityCalculatorRes) => {
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

        this.Error = err.error.message;
        this.Loading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
