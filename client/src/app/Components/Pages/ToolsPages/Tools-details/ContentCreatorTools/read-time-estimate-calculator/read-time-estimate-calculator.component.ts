import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { CommonModule } from '@angular/common';
import {
  HttpErrorResponseDetails,
  ReadTimeStats,
} from '../../../../../../Core/Models/ToolsModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-time-estimate-calculator',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './read-time-estimate-calculator.component.html',
  styleUrl: './read-time-estimate-calculator.component.css',
})
export class ReadTimeEstimateCalculatorComponent implements OnInit {
  Error: string | null = null;
  Loading: boolean = false;
  Data: ReadTimeStats | null = null;

  Form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tools: ToolsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({ Text: ['', Validators.required] });
  }

  onSubmit(): void {
    this.Loading = true;
    this.Error = null;

    this.tools.ReadTimeEstimateCalculator(this.Form.value).subscribe({
      next: (value: ReadTimeStats) => {
        this.Data = value;
        this.Loading = false;
      },
      error: (err: HttpErrorResponseDetails) => {
        if (err.error.message === 'Missing token.') {
          this.router.navigateByUrl('/LogIn');
        }

        this.Error = err.error.message;
        this.Loading = false;
      },
    });
  }
}
