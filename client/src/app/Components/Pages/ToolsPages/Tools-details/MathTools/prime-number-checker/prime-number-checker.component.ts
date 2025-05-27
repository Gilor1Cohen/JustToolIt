import { Component, OnInit } from '@angular/core';
import {
  HttpErrorResponseDetails,
  PrimeNumberCheckerRes,
} from '../../../../../../Core/Models/ToolsModel';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prime-number-checker',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './prime-number-checker.component.html',
  styleUrl: './prime-number-checker.component.css',
})
export class PrimeNumberCheckerComponent implements OnInit {
  Form!: FormGroup;
  Data: PrimeNumberCheckerRes | null = null;
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
      number: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    this.Data = null;
    this.Error = null;
    this.Loading = true;

    this.tools.checkPrimeAndFactors(this.Form.value.number).subscribe({
      next: (value: PrimeNumberCheckerRes) => {
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
